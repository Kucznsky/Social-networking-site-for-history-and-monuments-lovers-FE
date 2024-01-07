import { User } from './user.model';
import { CommentResponse } from '../interfaces';

export class UserComment {
  _id: string = '';
  author: User;
  post: string;
  content: string = '';
  creationDate: Date;
  constructor(commentResponseData: CommentResponse) {
    Object.assign(this, commentResponseData);
  }
}
