import {Connection} from "./Connection";
import {MainDAO} from "./MainDAO";

export class ReviewDAO extends MainDAO{
    private static it: ReviewDAO;
    COLLECTION = process.env.DB_REVIEWS_COLLECTION as string;

    async deleteOneById(id: number): Promise<boolean> {
        const res = await this.deleteOneHow({_id: id});
        return (typeof res !== "undefined") && res.deletedCount === 1;
    }

    static getInstance() {
        if (!this.it)
            this.it = new ReviewDAO(Connection.getInstance());

        return this.it;
    }
}