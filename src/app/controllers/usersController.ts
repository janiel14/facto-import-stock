import Users, { IUser } from "../models/usersModel";

/**
 * UsersController
 */
export class UsersController {
    /**
     * constructor
     */
    constructor() {}

    /**
     * createUser
     * @param instanceId
     * @param accessToken
     * @param refreshToken
     * @returns {IUser} user
     */
    async createUser(
        instanceId: string,
        accessToken: string,
        refreshToken: string
    ): Promise<IUser> {
        try {
            return await Users.create({
                instanceId: instanceId,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        } catch (error) {
            console.error("UsersController.createUser: ", error);
            throw error;
        }
    }

    /**
     * updateUser
     * @param user
     */
    async updateUser(user: IUser): Promise<IUser> {
        try {
            await Users.updateOne({ _id: user._id }, user);
            return user;
        } catch (error) {
            console.error("UsersController.updateUser: ", error);
            throw error;
        }
    }

    /**
     * getUser
     * @param instanceId
     */
    async getUser(instanceId: string): Promise<IUser> {
        try {
            return await Users.findOne({ instanceId: instanceId });
        } catch (error) {
            console.error("UsersController.updateUser: ", error);
            throw error;
        }
    }
}
