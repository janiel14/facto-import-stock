import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import methodOverride from "method-override";
import { SigninRouter } from "../app/routers/signinRouter";
import { NotFoundRouter } from "../app/routers/notFoundRouter";
import { MongoDB } from "./mongoDB";

/**
 * Express
 */
export class Express {
    port: number;
    app: Object;
    wixAppId: string;
    wixAppSecret: string;
    baseUrl: string;

    /**
     * constructor
     */
    constructor() {
        const app = express();
        this.port = parseInt(process.env.NODE_PORT) || 7088;
        this.wixAppId = process.env.NODE_WIX_APP_ID || null;
        this.wixAppSecret = process.env.NODE_WIX_APP_SECRET || null;
        this.baseUrl =
            process.env.NODE_BASE_URL || `http://localhost:${this.port}`;
        app.set("view engine", "pug");
        app.set("views", "app/views");
        app.set("port", this.port);
        app.use(express.static("./public"));
        app.use(bodyParser.urlencoded({ limit: "1024mb", extended: true }));
        app.use(bodyParser.json({ limit: "1024mb" }));
        app.use(methodOverride());
        app.use(cors());
        app.use(helmet());
        app.use(compression());
        const mongo = new MongoDB();
        mongo.connectDB();
        //routes
        app.use(
            new SigninRouter(this.wixAppId, this.wixAppSecret, this.baseUrl).r
        );
        app.use(new NotFoundRouter().r);
        this.app = app;
    }
}
