import express, {Request, Response} from 'express';
import * as dotenv from "dotenv"

console.log("establishing the app");

dotenv.config();
if (!process.env.APP_PORT)
    process.exit(1);
const app = express();
const PORT: number = parseInt(process.env.APP_PORT as string, 10);
console.log(PORT);

app.get('/', (req: Request, res: Response) => {
    console.log(`${PORT}`);
    const path = __dirname.replace(/dist/, "/resource/views/landing.html");
    res.sendFile(path);
});

app.listen(PORT).on("error", () => {
    console.log('error while trying listen the port' + PORT);
});