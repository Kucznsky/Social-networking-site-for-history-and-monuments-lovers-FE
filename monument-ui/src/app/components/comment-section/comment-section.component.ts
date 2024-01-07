import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { JwtService } from 'src/app/services/jwt.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserComment } from 'src/app/models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentSectionComponent implements OnInit, OnDestroy{
  public commentFormControl: FormControl = new FormControl<string>('', [
    Validators.required,
  ]);
  public comments: UserComment[];
  public isClicked = false;

  private postId: string
  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly commentService: CommentService,
    private readonly jwtService: JwtService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.getPostId()
    this.commentService.getComments(this.postId).pipe(takeUntil(this.unsubscriber)).subscribe((comments)=>{
      this.comments = comments
      this.changeDetectorRef.markForCheck()
    })
  }

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public createComment(): void {
    const authorId = this.jwtService.getLoggedUsersId();
    const comment = this.commentFormControl.getRawValue();
    if (this.commentFormControl.valid)
      this.commentService.createComment(authorId, this.postId, comment);
  }

  public commentInputClicked(): void {
    this.isClicked = true;
  }

  public cancelClicked(): void {
    this.isClicked = false;
  }

  private getPostId(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id')
  }
}
