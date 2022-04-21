import express from 'express';
import {run} from "./db/connection";

const app = express();
const port = 3000;
run();
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('hello from typescript!');
});

app.listen(port).on("error", () => {
    console.log('error while trying listen the port' + port);
});