import { Router } from "express";

/**
 * NotFound
 */
export class IndexRouter {
    r: Router;

    /**
     * constructor
     */
    constructor() {
        this.r = Router();
        this.r.get(`/`, async (req, res) => {
            res.render("index.pug", {
                instanceId: req.query.instanceId
            });
        });
    }
}
