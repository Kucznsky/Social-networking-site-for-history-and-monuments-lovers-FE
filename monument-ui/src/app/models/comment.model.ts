import { User } from './user.model';
import { CommentResponse } from '../interfaces/comment.interface';

export class UserComment {
  id: string = '';
  content: string = '';
  authorId: string = ''
  constructor(commentResponseData: CommentResponse) {
    Object.assign(this, commentResponseData);
  }
}
