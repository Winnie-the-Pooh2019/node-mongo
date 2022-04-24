import {Connection} from "../connection";
import * as fs from 'fs';
import {DTO} from "../../model/DTO";
import TagDTO from "../../model/TagDTO";
import ReviewDTO from "../../model/ReviewDTO";
import MagazineDTO from "../../model/MagazineDTO";

async function checkDataPersistence() {
    const connection = await Connection.getInstance().connect();
    const collections = await connection.listCollections().toArray();

    console.log(collections.length);

    if (collections.length === 0) {
        console.log("reading input files");

        let reader = new Reader(new TagDTO());
        let content = reader.read();
        console.log(content);
        await connection.collection(process.env.DB_TAGS_COLLECTION as string).insertMany(content);

        reader = new Reader(new ReviewDTO());
        content = reader.read();
        console.log(content);
        await connection.collection(process.env.DB_REVIEWS_COLLECTION as string).insertMany(content);

        reader = new Reader(new MagazineDTO());
        content = reader.read();
        console.log(content);
        await connection.collection(process.env.DB_MAGAZINE_COLLECTION as string).insertMany(content);
    }
}

class Reader {
    readonly path;

    constructor(dto: DTO) {
        this.path = __dirname.replace(/dist\/db\/migration/, "resource/data/")
            + dto.constructor.name.toLowerCase().replace(/dto/, "s.json");
    }

    read() {
        console.log(this.path);
        const rawData = fs.readFileSync(this.path,'utf8');
        return JSON.parse(rawData);
    }
}

checkDataPersistence().then(() => {
    process.exit();
});

