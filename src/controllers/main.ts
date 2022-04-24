import * as express from 'express';
import {Request, Response} from "express/ts4.0";

const router = express.Router();

router.get('/', async (request: Request, response: Response) => {
    response.render('index', (err: Error, html: string) => {
        console.log("no such view found");
    });
});