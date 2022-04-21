"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./db/connection");
const app = (0, express_1.default)();
const port = 3000;
(0, connection_1.run)();
app.get('/', (req, res) => {
    res.send('hello from typescript!');
});
app.listen(port).on("error", () => {
    console.log('error while trying listen the port' + port);
});
//# sourceMappingURL=app.js.map