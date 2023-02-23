import { Router, Request, Response } from "express";
import accountsController from "../controllers/accounts";
import { accountSchema } from "../models/account";

function validateAccount(req: Request, res: Response, next: any) {
    const { error } = accountSchema.validate(req.body);

    if(error == null) return next();

    const { details } = error;
    
    res.status(422).end();
}

const router = Router();

router.get('/accounts/', accountsController.getAccounts);

router.get('/accounts/:id', accountsController.getAccount);

router.post('/accounts/', validateAccount, accountsController.addAccount);

export default router;