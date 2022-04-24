import * as express from 'express';
import {Request, Response} from "express/ts4.0";
import {MagazineDAO} from "../db/MagazineDAO";

export const searchRouter = express.Router();
const dao = MagazineDAO.getInstance();

searchRouter.get('/all', async (request: Request, response: Response) => {
    const data = (await dao.findAll());
    // console.log(data);
    // response.contentType("application/json");
    response.json(data);
});

searchRouter.get('/byName', async (request: Request, response: Response) => {
    if (!request.query.name)
        response.redirect('/all');
    if (!isString(request.query.name))
        response.json({});

    const data = (await dao.findByName(request.query.name as string));
    response.json(data);
});

searchRouter.get('/byAuthor', async (request: Request, response: Response) => {
    if (!request.query.author)
        response.redirect('/all');
    if (!isString(request.query.author))
        response.json({});

    const data = (await dao.findByAuthor(request.query.author as string));
    response.json(data);
})

function isString(str: any): boolean {
    return str instanceof String || typeof str === 'string';
}