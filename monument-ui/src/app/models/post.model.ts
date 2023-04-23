import { Category } from "../enums/post-category.enum";
import { PostResponse } from "../interfaces/post.interface";
import { Localisation } from "./localisation.model";
import { User } from "./user.model";

export class PostToDisplay {
    public id: string = '';
    public title: string = '';
    public category: Category = Category.Other;
    public likes: number = 0;
    public isLiked: boolean = false;
    public usersCommentsId: string[] = [];
    public author: User = new User; 
    public localisation: Localisation = new Localisation();
    public thumbnail: string = '';
    public modernImages: string[] = [];
    public archivalImages: string[] = [];
    public description: string = '';

    constructor(postResponseData: PostResponse){
        // Object.keys(postResponseData).forEach((key) =>{ if(key === 'userComments'){this.userComments = postResponseData[key].map((comment) => {new UserComment(comment)})} else if(key === 'author'){this.author = new User(postResponseData[key])} else if(key === 'localisation'){this.localisation = new Localisation(postResponseData[key])} else {this[key] = postResponseData[key]}})
        Object.assign(this, postResponseData);
    }
}
