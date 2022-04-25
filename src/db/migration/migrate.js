import magazines from "./data/magazines.json";
import reviews from "./data/reviews.json";
import tags from "./data/tags.json";
import {Connection} from "../Connection";

export async function checkDataPersistence() {
    const connection = await Connection.getInstance().connect();

    await connection.collection(process.env.DB_TAGS_COLLECTION).drop();
    await connection.collection(process.env.DB_REVIEWS_COLLECTION).drop();
    await connection.collection(process.env.DB_MAGAZINE_COLLECTION).drop();

    const collections = await connection.listCollections().toArray();

    if (collections.length === 0) {
        await connection.collection(process.env.DB_TAGS_COLLECTION).insertMany(tags);
        await connection.collection(process.env.DB_REVIEWS_COLLECTION).insertMany(reviews);
        await connection.collection(process.env.DB_MAGAZINE_COLLECTION).insertMany(magazines);
    }
}

checkDataPersistence().then(() => {
    process.exit();
})