import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { JwtService } from '../../services/jwt.service';
import { UserService } from '../../services/user.service';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserComment } from '../../models';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentSectionComponent implements OnInit, OnDestroy {
  public commentFormGroup: UntypedFormGroup = new UntypedFormGroup({
    comment: new FormControl<string>('', [Validators.required]),
  });
  public comments: UserComment[];
  public commentAuthors: User[];
  public loggedUser: User;
  public isClicked = false;

  private postId: string;
  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.getPostId();
    this.getLoggedUser();
    this.userService
      .getAuthorsOfTheComments(this.postId)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((authors) => {
        this.commentService
          .getComments(this.postId)
          .pipe(takeUntil(this.unsubscriber))
          .subscribe((comments) => {
            this.comments = comments.map((comment) => {
              const author = authors.find(
                (author) => author.id === comment.author.toString(),
              );
              const commentObj = new UserComment(comment);
              commentObj.author = author;
              return commentObj;
            });

            this.comments.sort((a, b) => {
              return (
                new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
              );
            });
            this.changeDetectorRef.markForCheck();
          });
      });
  }

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public createComment(): void {
    const authorId = this.jwtService.getLoggedUsersId();
    const comment = this.commentFormGroup.controls['comment'].getRawValue();
    if (this.commentFormGroup.valid)
      this.commentService
        .createComment(authorId, this.postId, comment)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe((comment) => {
          const newComment = new UserComment({
            _id: comment._id,
            author: this.loggedUser,
            content: comment.content,
            creationDate: comment.creationDate,
            post: comment.post,
          });
          this.comments.unshift(newComment);
          this.changeDetectorRef.markForCheck();
        });
  }

  public commentInputClicked(): void {
    if(this.jwtService.isTokenValid()) {
      this.isClicked = true;
    } else {
      this.router.navigate(['/auth/login'])
    }
  }

  public cancelClicked(): void {
    this.isClicked = false;
  }

  private getPostId(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  private getLoggedUser(): void {
    this.userService
      .getUserById(this.jwtService.getLoggedUsersId())
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((user) => {
        this.loggedUser = user;
      });
  }
}
