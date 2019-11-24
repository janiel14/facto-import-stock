import { API } from "../../lib/request";
import { IUser } from "../models/usersModel";
import { UsersController } from "./usersController";

export class SigninController {
    wixAppId: string;
    wixAppSecret: string;
    baseUrl: string;
    Users: UsersController;

    /**
     * constructor
     * @param wixAppId
     * @param wixAppSecret
     * @param baseUrl
     */
    constructor(wixAppId: string, wixAppSecret: string, baseUrl: string) {
        this.wixAppId = wixAppId;
        this.wixAppSecret = wixAppSecret;
        this.baseUrl = baseUrl;
        this.Users = new UsersController();
    }

    /**
     * requestPermission
     * @param token
     * @returns {string} url
     */
    requestPermission(token: string) {
        return `https://www.wix.com/app-oauth-installation/consent?token=${token}&appId=${this.wixAppSecret}&redirectUrl=${this.baseUrl}/authorize`;
    }

    /**
     *
     * @param code
     * @param state
     * @param instanceId
     */
    async requestFinalToken(
        code: string,
        state: string,
        instanceId: string
    ): Promise<string> {
        try {
            const api = new API(`https://www.wix.com`);
            const response = await api.post(
                "/oauth/access",
                {
                    grant_type: "authorization_code",
                    client_id: this.wixAppId,
                    client_secret: this.wixAppSecret,
                    code: code
                },
                {}
            );
            await this.Users.createUser(
                instanceId,
                response.access_token,
                response.refreshToken
            );
            return `https://www.wix.com/app-oauth-installation/${response.access_token}`;
        } catch (error) {
            console.error("SigninController.requestFinalToken: ", error);
            throw Error("Failed on get token final!!!");
        }
    }

    /**
     * refreshToken
     * @param instanceId
     */
    async refreshToken(instanceId: string): Promise<IUser> {
        try {
            const user = await this.Users.getUser(instanceId);
            const api = new API(`https://www.wix.com`);
            const response = await api.post(
                "/oauth/access",
                {
                    grant_type: "refresh_token",
                    client_id: this.wixAppId,
                    client_secret: this.wixAppSecret,
                    refresh_token: user.refreshToken
                },
                {}
            );
            user.updatedAt = new Date();
            user.accessToken = response.access_token;
            user.refreshToken = response.refresh_token;
            await this.Users.updateUser(user);
            return user;
        } catch (error) {
            console.error("SigninController.requestFinalToken: ", error);
            throw Error("Failed on get token final!!!");
        }
    }
}
