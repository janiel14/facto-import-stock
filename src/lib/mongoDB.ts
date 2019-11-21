import { connect } from "mongoose";

export class MongoDB {
    _options: object;
    /**
     * constructor
     */
    constructor() {
        this._options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: true,
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4, // Use IPv4, skip trying IPv6
            useUnifiedTopology: true,
            auth: {
                user: null,
                password: null
            }
        };
    }

    /**
     * connectDB
     */
    async connectDB() {
        try {
            const uri =
                process.env.NODE_MONGO_URL || "mongodb://localhost/test";
            await connect(uri, this._options);
        } catch (error) {
            console.error("MongoDB.connectDB: ", error);
        }
    }
}
