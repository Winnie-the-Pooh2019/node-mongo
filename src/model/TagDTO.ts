import {ObjectId} from "mongodb";
import {DTO} from "./DTO";

export default class TagDTO extends DTO{
    constructor(
        public name?: string,
        public _id?: ObjectId
    ) {super();}
}