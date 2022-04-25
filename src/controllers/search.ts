import * as express from 'express';
import {Request, Response} from "express/ts4.0";
import {MagazineDAO} from "../db/MagazineDAO";

export const searchRouter = express.Router();
const dao = MagazineDAO.getInstance();

searchRouter.get('/all', async (request: Request, response: Response) => {
    const data = (await dao.findAll());
    response.json(data);
});

searchRouter.get('/byName', async (request: Request, response: Response) => {
    if (!request.query.name) {
        response.redirect('/search/all');
        return;
    }

    const data = (await dao.findByName(request.query.name as string));
    // console.log(data);

    response.setHeader('Content-Type', 'application/json');
    response.json(data);
});

searchRouter.get('/byAuthor', async (request: Request, response: Response) => {
    if (!request.query.author) {
        response.redirect('/search/all');
        return;
    }

    const data = (await dao.findByAuthor(request.query.author as string));
    // console.log(data);

    response.setHeader('Content-Type', 'application/json');
    response.json(data);
});

searchRouter.get('/betweenDates', async (request: Request, response: Response) => {
    if (!request.query.start || !request.query.end) {
        response.redirect('/search/all');
        return;
    }

    const data = (await dao.fundBetweenDates(
        request.query.start as string, request.query.end as string));
    console.log(data);

    response.setHeader('Content-Type', 'application/json');
    response.json(data);
});

searchRouter.get('/authors', async (request: Request, response: Response) => {
    const data = await dao.findAuthors();
    response.json(data);
});