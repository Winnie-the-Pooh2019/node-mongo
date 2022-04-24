import {Connection} from "./connection";
import MagazineDTO from "../model/MagazineDTO";

export class MagazineDAO {
    private static it: MagazineDAO;
    private readonly filter: { projection: { _id: number, name: number, authors: number, date: number }};

    private constructor(private connection: Connection) {
        this.filter = {
            projection: {
                _id: 1,
                name: 1,
                authors: 1,
                date: 1
            }
        };
    }

    async findAll() {
        return this.findHow({}, this.filter);
    }

    async findByName(queryName: string) {
        return await this.findHow({ name: new RegExp(queryName, 'i') }, this.filter);
    }

    async findByAuthor(queryAuthor: string) {
        return this.findHow({ authors: new RegExp(queryAuthor, 'i') }, this.filter);
    }

    async findAuthors() {
        const db = await this.connection.connect(process.env.DB_NAME);

        const pipeline = [
            { $unwind: { path: "$authors" } },
            { $group: { _id: "$authors" } },
            { $project: { _id: 1 } }
        ];

        try {
            return await (db.collection(process.env.DB_MAGAZINE_COLLECTION as string)
                .aggregate(pipeline).toArray());
        } catch (e: any) {
            console.log(e);
        }
    }

    private async findHow<Filter, Projection>(filter: Filter, projection: Projection) {
        const db = await  this.connection.connect(process.env.DB_NAME);

        try {
            return await (db.collection<MagazineDTO>(process.env.DB_MAGAZINE_COLLECTION as string)
                .find<MagazineDTO>(filter, projection).toArray());
        } catch (e: any) {
            console.log(e);
        } finally {
            await this.connection.disconnect();
        }
    }

    static getInstance() {
        if (!this.it)
            this.it = new MagazineDAO(Connection.getInstance());

        return this.it;
    }
}