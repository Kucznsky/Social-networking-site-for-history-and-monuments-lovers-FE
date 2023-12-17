import { Category } from '../enums/post-category.enum';

export class NewPost {
  // public id: string = '';
  // public title: string = '';
  // public category: Category = Category.Other;
  // public likes: number = 0;
  // public isLiked: boolean = false;
  // public usersCommentsId: string[] = [];
  // public author: User = new User;
  // public localisation: Localisation = new Localisation();
  // public thumbnail: string = '';
  // public modernImages: string[] = [];
  // public archivalImages: string[] = [];
  // public description: string = '';
  category: Category = Category.Other;
  title = '';
  content = '';
  localisation = '';
  authorId = '';
}
