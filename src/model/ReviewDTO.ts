import {ObjectId} from "mongodb";
import {DTO} from "./DTO";

export default class ReviewDTO extends DTO{
    constructor(
        public name?: string,
        public message?: string,
        public mark?: number,
        public _id?: ObjectId
    ) {super();}

    genPath(): string {
        return "";
    }
}
