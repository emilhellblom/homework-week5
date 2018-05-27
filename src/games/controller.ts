import {JsonController, Get, Post, HttpCode, Body, Put, Param, NotFoundError, BadRequestError} from 'routing-controllers'
import Game, {colors} from './entity'


function getRandomColor() {
    return Math.floor(Math.random() * colors.length);
}

const defaultBoard = [
	["o", "o", "o"],
	["o", "o", "o"],
	["o", "o", "o"]
]

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

@JsonController()
export default class GameController {

    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return { games }
    }

    @Post('/games')
    @HttpCode(201)
    createGame(
        @Body() game: Game
    ) {
        console.log(colors[getRandomColor()])
        game.color = colors[getRandomColor()]
        game.board = defaultBoard
        return game.save()
    }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('This is not a valid game')
        if (update.id) throw new NotFoundError('You are not able to change id')

        console.log(game.board, 'THIS IS THE ORIGINAL')
        console.log(update.board, 'THIS IS THE NEW')
        if (update.board) {
            if (moves(game.board, update.board) > 1) {
                throw new BadRequestError('Nu-uh, you ain\'t cheatin in my game!')
            } else {
                return Game.merge(game, update).save()
            }
        }   
    }
}