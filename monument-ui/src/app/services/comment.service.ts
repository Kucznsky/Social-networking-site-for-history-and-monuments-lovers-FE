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
  ): Observable<UserComment> {
    return this.commentApiService
      .createComment({ postId: postId, authorId: userId, content: content })
      .pipe(map((comment) => new UserComment(comment)));
  }

  public getComments(postId: string): Observable<UserComment[]> {
    return this.commentApiService
      .getComments(postId)
      .pipe(
        map((comments) =>
          comments.map((comment) => this.createCommentObject(comment)),
        ),
      );
  }

  private createCommentObject(commentResponse: CommentResponse): UserComment {
    let author: User;
    this.userService
      .getUserById(commentResponse.author)
      .pipe(take(1))
      .subscribe((user) => {
        console.log(user)
        author = new User(user);
      });
    const comment = new UserComment(commentResponse);
    comment.author = author;
    console.log(author)
    return comment;
  }
}
