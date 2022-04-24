import express from 'express';
import * as dotenv from "dotenv"
import path from "path";
import { searchRouter } from "./controllers/search";

dotenv.config();
if (!process.env.APP_PORT)
    process.exit(1);
const app = express();
const PORT: number = parseInt(process.env.APP_PORT as string, 10);
console.log(PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname.replace('dist', ''), 'public')));
app.use('/search', searchRouter);

console.log(path);

app.listen(PORT).on("error", () => {
    console.log('error while trying listen the port' + PORT);
});