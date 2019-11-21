import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        index: true
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
        index: true
    },
    instanceId: {
        type: String,
        required: true,
        index: true
    },
    accessToken: {
        type: String,
        required: false
    },
    refreshToken: {
        type: String,
        required: false
    }
});
export default mongoose.model("users", schema);
