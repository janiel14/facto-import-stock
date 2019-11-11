import { API } from "../../lib/request";

export class MobileStock {
    username: string;
    password: string;
    static baseurl = "https://www.mobilestock.com.br";

    /**
     *Creates an instance of MobileStock.
     * @param {string} username
     * @param {string} password
     * @memberof MobileStock
     */
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    /**
     * stockGet
     * @returns {Array} products
     * @memberof MobileStock
     */
    async stockGet() {
        try {
            const api = new API(MobileStock.baseurl);
            return await api.post("/servicos/estoque-json", {
                usuario: this.username,
                senha: this.password
            });
        } catch (error) {
            console.error("MobileStock.stockGet: ", error);
            throw Error("Failed on get stock!!!");
        }
    }
}
