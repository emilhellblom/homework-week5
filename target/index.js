"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const controller_1 = require("./games/controller");
const db_1 = require("./db");
const port = process.env.PORT || 4000;
const app = routing_controllers_1.createKoaServer({
    controllers: [controller_1.default]
});
db_1.default()
    .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map