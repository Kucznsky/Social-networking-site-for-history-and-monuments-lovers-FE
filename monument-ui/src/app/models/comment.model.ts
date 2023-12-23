import { User } from './user.model';
import { CommentResponse } from '../interfaces';

export class UserComment {
  id: string = '';
  content: string = '';
  authorId: string = '';
  constructor(commentResponseData: CommentResponse) {
    Object.assign(this, commentResponseData);
  }
}
