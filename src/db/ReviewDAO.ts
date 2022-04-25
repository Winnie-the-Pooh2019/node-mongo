import {Connection} from "./Connection";

export class ReviewDAO {
    private static it: ReviewDAO;
    private COLLECTION = process.env.DB_REVIEWS_COLLECTION as string;
    private constructor(private connection: Connection) {}

    async deleteOneById(id: number): Promise<boolean> {
        try {
            const db = await this.connection.connect(process.env.DB_NAME);
            const res = await db.collection(process.env.DB_REVIEWS_COLLECTION as string).deleteOne({_id: id});

            return res.deletedCount === 1;
        } catch (e: any) {
            console.log(e);
            return false;
        } finally {
            await this.connection.disconnect();
        }
    }

    static getInstance() {
        if (!this.it)
            this.it = new ReviewDAO(Connection.getInstance());

        return this.it;
    }
}