import express, { Application } from "express";

import routes from "./routes";

class Server {

    private app: Application;
    private port: number;

    constructor() {

        this.app = express();

        this.port = Number(process.env.PORT) || 3000;

        this.middlewares();

        this.routes();
    }


    private middlewares(): void {

        this.app.use(express.json());

    }


   private routes(): void {

    this.app.get("/", (req, res) => {

        res.json({
            message: "Servidor funcionando"
        });

    });


    this.app.use(
        "/api/v1",
        routes
    );

}


    public listen(): void {

        this.app.listen(this.port, () => {

            console.log(
                `Servidor ejecutándose en http://localhost:${this.port}`
            );

        });

    }

}

export default Server;