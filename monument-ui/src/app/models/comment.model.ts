import { User } from "./user.model";

export class Comment {
    id: string = ''
    content: string = '';
    author: User = new User; 
}