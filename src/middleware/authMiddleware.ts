import {Request, Response, NextFunction} from "express";

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "qwerty"

export function authGuard(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers['authorization'] as string;
    if (!auth) {
        res.sendStatus(401);
        return;
    }

    const [authType, token] = auth.split(' ');
    if (authType !== 'Basic') {
        res.sendStatus(401);
        return;
    }

    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        res.sendStatus(401);
        return;
    }
    next();
}