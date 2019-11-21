import { API } from "../../lib/request";
import Users from "../models/usersModel";

export class SigninController {
    wixAppId: string;
    wixAppSecret: string;
    baseUrl: string;

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
    }

    /**
     * requestPermission
     * @param token
     * @returns {string} url
     */
    requestPermission(token: string) {
        return `https://www.wix.com/app-oauth-installation/consent?token=${token}&appId=${this.wixAppSecret}&redirectUrl=${this.baseUrl}/callback`;
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
            const response = await api.post("/oauth/access", {
                grant_type: "authorization_code",
                client_id: this.wixAppId,
                client_secret: this.wixAppSecret,
                code: code
            });
            await Users.create({
                instanceId: instanceId,
                accessToken: response.accessToken,
                refreshToken: response.refreshToken
            });
            return `https://www.wix.com/app-oauth-installation/${response.access_token}`;
        } catch (error) {
            console.error("SigninController.requestFinalToken: ", error);
            throw Error("Failed on get token final!!!");
        }
    }
}
