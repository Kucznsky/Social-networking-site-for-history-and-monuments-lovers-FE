import { Category } from "../enums/post-category.enum";
import { Localisation } from "./localisation.model";
import { User } from "./user.model";

export class Posts {
    id: string = '';
    title: string = '';
    category: Category = Category.Other;
    likes: number = 0;
    isLiked: boolean = false;
    comments: Comment[] = [];
    author: User = new User; 
    localisation: Localisation = new Localisation;
    thumbnail: string = '';
    modernImages: string[] = [];
    archivalImages: string[] = [];
    description: string = '';

    constructor(data: any){
        Object.assign(this, data);
        return;
    }
}