import {Connection} from "./Connection";
import {MagazineDTO} from "../model/MagazineDTO";
import {ReviewDAO} from "./ReviewDAO";

export class MagazineDAO {
    private static it: MagazineDAO;
    private COLLECTION = process.env.DB_MAGAZINE_COLLECTION as string;
    private readonly projection: { projection: { _id: number, name: number, authors: number, date: number } };

    private constructor(private connection: Connection) {
        this.projection = {
            projection: {
                _id: 1,
                name: 1,
                authors: 1,
                date: 1
            }
        };
    }

    async findAll() {
        return this.findHow({}, this.projection);
    }

    async findByName(queryName: string) {
        return this.findHow({name: new RegExp(queryName, 'i')}, this.projection);
    }

    async findByAuthor(queryAuthor: string) {
        return this.findHow({authors: new RegExp(queryAuthor, 'i')}, this.projection);
    }

    async fundBetweenDates(start: string, end: string) {
        const filter = {
            date: {
                $gte: start,
                $lte: end } }
        return this.findHow(filter, this.projection);
    }

    async findAuthors() {
        const db = await this.connection.connect(process.env.DB_NAME);

        const pipeline = [
            {$unwind: {path: "$authors"}},
            {$group: {_id: "$authors"}},
            {$project: {_id: 1}}
        ];

        try {
            return await (db.collection(this.COLLECTION)
                .aggregate(pipeline).toArray());
        } catch (e: any) {
            console.log(e);
        } finally {
            await this.connection.disconnect();
        }
    }

    async findById(id: number) {
        const lookupTags = {
            $lookup: {
                from: "tags",
                localField: "tags",
                foreignField: "_id",
                as: "tags"
            }
        };

        const lookupReviews = {
            $lookup: {
                from: "reviews",
                localField: "reviews",
                foreignField: "_id",
                as: "reviews"
            }
        };

        try {
            const db = await this.connection.connect(process.env.DB_NAME);
            const pipeline = [ { $match: { _id: { $eq: id } } },
                lookupReviews, lookupTags ];

            return await (db.collection(this.COLLECTION)
                .aggregate(pipeline).toArray());
        } catch (e: any) {
            console.log(e);
        } finally {
            await this.connection.disconnect();
        }
    }

    async deleteOneById(id: number): Promise<boolean> {
        try {
            const articleReviews = await this.findHow({_id: id}, {_id: 0, reviews: 1});
            if (!articleReviews)
                return false;

            const reviewDao = ReviewDAO.getInstance();
            for (const article of articleReviews) {
                const res = await reviewDao.deleteOneById(id);
                if (!res)
                    return false;
            }

            const db = await this.connection.connect(process.env.DB_NAME);
            const result = await db.collection(this.COLLECTION).deleteOne({_id: id});

            return (result.deletedCount === 1);
        } catch (e: any) {
            console.log(e);
            return false;
        } finally {
            await this.connection.disconnect();
        }
    }

    private async findHow<Filter, Projection>(filter: Filter, projection: Projection) {
        const db = await this.connection.connect(process.env.DB_NAME);

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