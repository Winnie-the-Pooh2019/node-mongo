import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

const url = "mongodb+srv://ivan:ba1man_sucks@cluster0.91yu0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoClient: mongoDB.MongoClient = new mongoDB.MongoClient(url);

export async function run() {
    try {
        await mongoClient.connect();

        console.log("connected to database");
    } catch (err: any) {
        console.log(err);
    }
}

export async function connect() {
    dotenv.config();
}