import { Router } from "express";
import { SigninController } from "../controllers/signinController";

/**
 * NotFound
 */
export class SigninRouter {
    r: Router;
    c: SigninController;

    /**
     * constructor
     * @param wixAppId
     * @param wixSecret
     * @param baseUrl
     */
    constructor(wixAppId: string, wixSecret: string, baseUrl: string) {
        this.r = Router();
        this.c = new SigninController(wixAppId, wixSecret, baseUrl);
        this.r.get(`/signin`, async (req, res) => {
            try {
                res.redirect(this.c.requestPermission(req.query.token));
            } catch (error) {
                res.status(500).json({
                    message: "Internal server error",
                    data: error
                });
            }
        });
        this.r.get(`/callback`, async (req, res) => {
            try {
                const url = await this.c.requestFinalToken(
                    req.query.code,
                    req.query.state,
                    req.query.instanceId
                );
                res.redirect(url);
            } catch (error) {
                res.status(500).json({
                    message: "Internal server error",
                    data: error
                });
            }
        });
    }
}
