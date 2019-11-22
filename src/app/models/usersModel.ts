import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    instanceId: string;
    accessToken: string;
    refreshToken: string;
}

export const UserSchema = new mongoose.Schema({
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

export default mongoose.model<IUser>("users", UserSchema);
