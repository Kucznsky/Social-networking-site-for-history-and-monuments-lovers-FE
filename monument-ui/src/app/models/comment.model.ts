import { User } from "./user.model";
import { CommentResponse } from "../interfaces/comment.interface";

export class Comment {
    id: string = ''
    content: string = '';
    author: User = new User; 
    constructor(data: CommentResponse){

    }
}