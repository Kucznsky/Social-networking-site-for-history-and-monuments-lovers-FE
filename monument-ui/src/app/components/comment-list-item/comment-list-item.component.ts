import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserComment } from '../../models';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { JwtService } from 'src/app/services/jwt.service';
import { CommentService } from 'src/app/services/comment.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss'],
})
export class CommentListItemComponent implements OnInit, OnDestroy {
  @Input() commentData: UserComment;

  public userAvatar;
  public usersPlaceholerInitials: string;
  public loggedUserId: string;
  public isViewedByAdmin: boolean;

  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly userAuthService: UserAuthService,
    private readonly jwtService: JwtService,
    private readonly commentService: CommentService,
  ) {}

  public ngOnInit(): void {
    this.sanitizeImageUrl();
    if (this.jwtService.isTokenValid()) {
      this.loggedUserId = this.jwtService.getLoggedUsersId();
      this.isViewedByAdmin = this.userAuthService.isUserAdmin();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public deleteComment(commentId: string) {
    this.commentService
      .deleteComment(commentId)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => {
        window.location.reload();
      });
  }

  private sanitizeImageUrl(): void {
    if (this.commentData.author.avatar) {
      this.userAvatar = this.domSanitizer.bypassSecurityTrustUrl(
        this.commentData.author.avatar,
      );
    } else {
      this.userAvatar = null;
      this.usersPlaceholerInitials = this.commentData.author.userName
        .charAt(0)
        .toUpperCase();
    }
  }
}
