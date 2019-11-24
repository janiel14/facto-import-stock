import { Router } from "express";
import { MobileStock } from "../controllers/mobilestockController";
import { UsersController } from "../controllers/usersController";
import { WixController } from "../controllers/wixController";
import { SigninController } from "../controllers/signinController";

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
        const Wix = new WixController();
        const Signin = new SigninController(
            process.env.NODE_WIX_APP_ID,
            process.env.NODE_WIX_APP_SECRET,
            process.env.NODE_BASE_URL
        );
        this.r.post(`/api/import/:instanceId`, async (req, res) => {
            try {
                if (process.env.NODE_ENV === "production")
                    await Signin.refreshToken(req.params.instanceId);
                const user = await Users.getUser(req.params.instanceId);
                if (user) {
                    const stocks = await this.c.stockGet(
                        req.body.username,
                        req.body.password
                    );
                    Wix.importProducts(user, stocks);
                    res.status(200).json({
                        message: "Produtos importados com sucesso!",
                        data: stocks
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
