import express from 'express';
import mongo from 'mongodb'

const app = express();
const port = 3000;
const mong = new mongo.MongoClient("");

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('hello from typescript!');
});

app.listen(port).on("error", () => {
    console.log('error while trying listen the port' + port);
});