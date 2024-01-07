import { UserResponse } from './user.interface';

export interface CommentResponse {
  _id: string;
  author: string;
  post: string;
  content: string;
  creationDate: Date;
}
