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
        return this.find({});
    }

    async findByName(queryName: string) {
        return this.find({ name: new RegExp(queryName.toLowerCase(), 'i') });
    }

    async findByAuthor(queryAuthor: string) {
        return this.find({ authors: new RegExp(queryAuthor.toLowerCase(), 'i') });
    }

    private async find<T>(object: T) {
        const db = await this.connection.connect(process.env.DB_NAME);

        try {
            return await (db.collection<MagazineDTO>(process.env.DB_MAGAZINE_COLLECTION as string)
                .find<MagazineDTO>(object, this.filter).toArray());
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