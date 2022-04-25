import {Connection} from "./Connection";
import {TagDTO} from "../model/TagDTO";
import {MainDAO} from "./MainDAO";

export class TagDAO extends MainDAO{
    private static it: TagDAO;
    COLLECTION = process.env.DB_TAGS_COLLECTION as string;

    static getInstance() {
        if (!this.it)
            this.it = new TagDAO(Connection.getInstance());

        return this.it;
    }
}