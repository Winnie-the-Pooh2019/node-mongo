// import express, {Request, Response} from 'express';
// import * as ItemService from "./items.service";
// import { BaseItem, Item } from "./item.interface";

import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"

dotenv.config();
if (!process.env.APP_PORT)
    process.exit(1);
const app = express();
const PORT: number = parseInt(process.env.APP_PORT as string, 10);

app.use(helmet());
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
    console.log(`${PORT}`);
    const path = __dirname.replace(/dist/, "/resource/views/landing.html");
    res.sendFile(path);
});

// app.post("/", (request: express.Request, response: Response) {
//     if(!request.body) return response.sendStatus(400);
//     console.log(request.body);
//     response.send(`${request.body.userName} - ${request.body.userAge}`);
// })

app.listen(PORT).on("error", () => {
    console.log('error while trying listen the port' + PORT);
});