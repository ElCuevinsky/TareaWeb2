"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Number(process.env.PORT) || 3000;
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.json({
                message: "Servidor funcionando"
            });
        });
        this.app.use("/api/v1", routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor ejecutándose en http://localhost:${this.port}`);
        });
    }
}
exports.default = Server;
