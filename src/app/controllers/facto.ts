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

    async requestToken() {}
}
