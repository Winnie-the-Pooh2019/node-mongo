import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export async function connect() {
    dotenv.config();
    const url = process.env.DB_CONNECTION_STRING;

    if (url !== undefined) {
        const mongoClient: mongoDB.MongoClient = new mongoDB.MongoClient(url);

    } else
        throw new URIError("couldn't find connection url");
}