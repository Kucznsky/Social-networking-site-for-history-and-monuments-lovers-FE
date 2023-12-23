import { Category } from '../enums';
import { CommentResponse } from './comment.interface';
import { LocalisationResponse } from './localisation.interface';
import { UserResponse } from './user.interface';

export interface PostResponse {
  _id: string;
  title: string;
  category: Category;
  likes: number;
  usersCommentsId: string[];
  author: UserResponse;
  location: LocalisationResponse;
  thumbnail: string;
  modernImages: string[];
  archivalImages: string[];
  content: string;
}
