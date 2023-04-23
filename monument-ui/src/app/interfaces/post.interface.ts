import { Category } from '../enums/post-category.enum';
import { CommentResponse } from './comment.interface';
import { LocalisationResponse } from './localisation.interface';
import { UserResponse } from './user.interface';

export interface PostResponse {
  id: string;
  title: string;
  category: Category;
  likes: number;
  isLiked: boolean;
  usersCommentsId: string[];
  author: UserResponse;
  location: LocalisationResponse;
  thumbnail: string;
  modernImages: string[];
  archivalImages: string[];
  description: string;
}
