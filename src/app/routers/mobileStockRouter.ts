import { Router } from "express";
import { MobileStock } from "../controllers/mobilestockController";
import { UsersController } from "../controllers/usersController";

/**
 * MobileStockRouter
 */
export class MobileStockRouter {
    r: Router;
    c: MobileStock;

    /**
     * constructor
     */
    constructor() {
        this.r = Router();
        this.c = new MobileStock();
        const Users = new UsersController();
        this.r.post(`/api/import/:instanceId`, async (req, res) => {
            try {
                const user = await Users.getUser(req.params.instanceId);
                if (user) {
                    const stock = await this.c.stockGet(
                        req.body.username,
                        req.body.password
                    );
                    res.status(200).json({
                        message: "Produtos importados com sucesso!",
                        data: stock
                    });
                } else {
                    res.status(500).json({
                        message:
                            "Instancia do seu aplicação não foi encontrada, tente reinstalar o aplicativo!!!"
                    });
                }
            } catch (error) {
                res.status(500).json({
                    message: "Internal server error",
                    data: error
                });
            }
        });
    }
}
