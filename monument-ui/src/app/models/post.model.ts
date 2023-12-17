import { Category } from '../enums/post-category.enum';
import { PostResponse } from '../interfaces/post.interface';
import { Localisation } from './localisation.model';
import { User } from './user.model';

export class UsersPost {
  public _id: string = '';
  public title: string = '';
  public category: Category = Category.Other;
  public likes: number = 0;
  public usersCommentsId: string[] = [];
  public author: User = new User();
  public localisation: Localisation = new Localisation();
  public thumbnail: string = '';
  public modernImages: string[] = [];
  public archivalImages: string[] = [];
  public content: string = '';
  public isLiked = false

  constructor(postResponseData: PostResponse) {
    Object.assign(this, postResponseData);
  }

  public setIsLikedValue() {
    this.isLiked = !this.isLiked
  }
}
