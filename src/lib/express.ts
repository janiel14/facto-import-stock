import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import methodOverride from "method-override";

/**
 * Express
 */
export class Express {
    port: number;
    app: Object;
    providerUsername: string;
    providerPassword: string;

    /**
     * constructor
     */
    constructor() {
        const app = express();
        this.port = parseInt(process.env.NODE_PORT) || 7088;
        this.providerUsername = process.env.NODE_PROVIDER_USERNAME;
        this.providerPassword = process.env.NODE_PROVIDER_PASSWORD;
        app.set("port", this.port);
        app.use(express.static("./public"));
        app.use(bodyParser.urlencoded({ limit: "1024mb", extended: true }));
        app.use(bodyParser.json({ limit: "1024mb" }));
        app.use(methodOverride());
        app.use(cors());
        app.use(helmet());
        app.use(compression());
        app.use("*", (req, res) => {
            res.status(200).json({
                message: "Im hard working now, please not disturb!!!"
            });
        });
        this.app = app;
    }
}
