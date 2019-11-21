import { API } from "../../lib/request";

export class Facto {
    appId: string;
    secretKey: string;
    static baseUrl = "https://www.wixapis.com/stores/v1";

    /**
     *Creates an instance of Facto.
     * @param {string} appId
     * @param {string} secretKey
     * @memberof Facto
     */
    constructor(appId: string, secretKey: string) {
        this.appId = appId;
        this.secretKey = secretKey;
    }

    async requestToken(code: string) {
        try {
            const api = new API("https://www.wix.com");
            const r = await api.post("/oauth/access", {
                grant_type: "authorization_code",
                client_id: this.appId,
                client_secret: this.secretKey,
                code: code
            });
        } catch (error) {
            console.error("Facto.requestToken: ", error);
            throw Error("Failed on request token from wix!!!");
        }
    }
}
