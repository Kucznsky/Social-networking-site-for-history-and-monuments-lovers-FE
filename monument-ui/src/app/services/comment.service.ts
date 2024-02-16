import { Injectable } from '@angular/core';
import { CommentApiService } from './comment-api.service';
import { Observable, map, take } from 'rxjs';
import { User, UserComment } from '../models';
import { UserService } from './user.service';
import { CommentResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private readonly commentApiService: CommentApiService,
    private readonly userService: UserService,
  ) {}

  public createComment(
    userId: string,
    postId: string,
    content: string,
  ): Observable<CommentResponse> {
    return this.commentApiService.createComment({
      postId: postId,
      authorId: userId,
      content: content,
    });
  }

  public getComments(postId: string): Observable<CommentResponse[]> {
    return this.commentApiService.getComments(postId);
  }

  public deleteComment(commentId: string): Observable<void> {
    return this.commentApiService.deleteComment(commentId);
  }
}
