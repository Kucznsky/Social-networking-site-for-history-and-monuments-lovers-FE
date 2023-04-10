import { Category } from "../enums/post-category.enum";
import { PostResponse } from "../interfaces/post.interface";
import { Localisation } from "./localisation.model";
import { User } from "./user.model";
import { Comment } from "./comment.model";
export class PostToDisplay {
    public id: string = '';
    public title: string = '';
    public category: Category = Category.Other;
    public likes: number = 0;
    public isLiked: boolean = false;
    public comments: Comment[] = [];
    public author: User = new User; 
    public localisation: Localisation = new Localisation;
    public thumbnail: string = '';
    public modernImages: string[] = [];
    public archivalImages: string[] = [];
    public description: string = '';

    constructor(data: PostResponse){
        Object.keys(data).forEach((key) => {
            if(key === 'comments') {
                this[key] = data[key].map((comment) => new Comment(comment))
            } else {
                this[key] = data[key]
            }
        })
        
            
        }
    }
}