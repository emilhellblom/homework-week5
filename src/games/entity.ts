import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsIn, ValidateIf } from 'class-validator'

export const colors = [
    'Red', 'Green', 'Blue', 'Yellow', 'Magenta'
]

@Entity()
export default class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', {nullable:false})
    name: string

    @ValidateIf(x => x.color)
    @IsString()
    @IsIn(colors)
    @Column('text', {nullable:false})
    color: string

    @Column('json', {nullable:true})
    board: string[][]
}