import {MagazineDTO} from "../model/MagazineDTO";
import {Connection} from "./Connection";

export abstract class MainDAO {
    protected readonly DB_NAME?: string;
    protected readonly COLLECTION?: string;

    protected constructor(protected connection: Connection) {}

    public async findHow<Filter, Projection>(filter: Filter, projection: Projection) {
        const db = await this.connection.connect(this.DB_NAME);

        try {
            return await (db.collection(this.COLLECTION as string)
                .find(filter, projection).toArray());
        } catch (e: any) {
            console.log(e);
        } finally {
            await this.connection.disconnect();
        }
    }

    public async aggregateHow<Pipeline extends Document[]>(pipeline: Pipeline) {
        const db = await this.connection.connect(this.DB_NAME);

        try {
            return await (db.collection(this.COLLECTION as string)
                .aggregate(pipeline));
        } catch (e: any) {
            console.log(e);
        } finally {
            await this.connection.disconnect();
        }
    }

    public async deleteOneHow<Filter>(filter: Filter) {
        const db = await this.connection.connect(this.DB_NAME);

        try {
            return await (db.collection(this.COLLECTION as string)
                .deleteOne(filter));
        } catch (e: any) {
            console.log(e);
        } finally {
            await this.connection.disconnect();
        }
    }
}