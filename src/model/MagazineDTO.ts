import {ObjectId} from "mongodb";
import {DTO} from "./DTO";

export default class MagazineDTO extends DTO{
    constructor(
        public name?: string,
        public authors?: string[],
        public date?: Date,
        public tagId?: ObjectId[],
        public content?: string
    ) {super();}

    genPath(): string {
        return "";
    }
}