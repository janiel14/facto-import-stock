import { API } from "../../lib/request";

export class MobileStock {
    static baseurl = "https://www.mobilestock.com.br";

    /**
     * construtor
     */
    constructor() {}

    /**
     * stockGet
     * @returns {Array} products
     * @memberof MobileStock
     */
    async stockGet(username: string, password: string) {
        try {
            const api = new API(MobileStock.baseurl);
            return await api.post("/servicos/estoque-json", {
                nome: username,
                senha: password
            });
        } catch (error) {
            console.error("MobileStock.stockGet: ", error);
            throw Error("Failed on get stock!!!");
        }
    }
}
