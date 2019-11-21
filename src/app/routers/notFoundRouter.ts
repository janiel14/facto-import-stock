import { Router } from "express";

/**
 * NotFound
 */
export class NotFoundRouter {
    r: Router;

    /**
     * constructor
     */
    constructor() {
        this.r = Router();
        this.r.get(`*`, async (req, res) => {
            res.status(404).send("<h1>Not found!!!</h1");
        });
    }
}
