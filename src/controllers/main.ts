import * as express from 'express';
import {Request, Response} from "express/ts4.0";
import {MagazineDAO} from "../db/MagazineDAO";

export const mainRouter = express.Router();

mainRouter.get('/create', async (request: Request, response: Response) => {
    response.render('create.pug');
});

mainRouter.get('/', async (request: Request, response: Response) => {
    response.render('index.pug', {
        title: "main window"
    });
});

mainRouter.get('/info', async (request: Request, response: Response) => {
    if (!request.query.id) {
        response.redirect('/');
        return;
    }

    const id: string = request.query.id as string;
    console.log(`id = ${id}`);

    const magazineDao = MagazineDAO.getInstance();
    const data = (await magazineDao.findById(parseInt(id, 10)));
    if (!data) {
        response.redirect('/');
        return;
    }
    console.log(data[0].name);

    response.render('info.pug', {
        article: data[0]
    });
});