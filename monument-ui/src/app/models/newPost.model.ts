import { Category } from '../enums';

export class NewPost {
  category: Category = Category.Other;
  title = '';
  content = '';
  localisation = '';
  authorId = '';
  thumbnail: string;
  oldPictures?: string[];
  modernPictures?: string[];
}
