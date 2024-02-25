import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersPost } from '../../models';
import { LikesService } from '../../services/likes.service';
import { JwtService } from '../../services/jwt.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListItemComponent implements OnInit, OnDestroy {
  @Input() post: UsersPost;
  @Input() isUsersPostSection: boolean;
  @Input() userId: string;
  public isViewedByAdmin = false;

  public isLiked = false;
  public isPermittedToDelete = false;
  public postImage;

  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly likesService: LikesService,
    private readonly router: Router,
    private readonly domSanitizer: DomSanitizer,
    private readonly jwtService: JwtService,
    private readonly userAuthService: UserAuthService,
    private readonly postService: PostService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    if (this.jwtService.isTokenValid()) {
      this.isViewedByAdmin = this.userAuthService.isUserAdmin();
    }
    this.sanitizeImageUrl();
    this.isLikedByLoggedUser();
  }

  public ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public addRemoveLike(isLiked: boolean): void {
    if (!this.userId) {
      this.router.navigate(['/auth/login']);
    } else if (!this.userAuthService.isUserVerifiedByEmail()) {
      this.router.navigate(['/not-verified']);
    } else {
      if (isLiked) {
        this.likesService
          .removeLike(this.userId, this.post._id)
          .pipe(takeUntil(this.unsubscriber))
          .subscribe(() => {
            this.isLiked = !isLiked;
            this.post.numberOfLikes -= 1;
            this.changeDetectorRef.markForCheck();
          });
      } else {
        this.likesService
          .addLike(this.userId, this.post._id)
          .pipe(takeUntil(this.unsubscriber))
          .subscribe(() => {
            this.isLiked = !isLiked;
            this.post.numberOfLikes += 1;
            this.changeDetectorRef.markForCheck();
          });
      }
    }
  }

  public deletePost(postId: string): void {
    this.postService
      .deletePost(postId)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => {
        window.location.reload();
        console.log('post deleted');
      });
  }

  public navigateToPostPage(postId: string): void {
    this.router.navigateByUrl(`/post/${postId}`);
  }

  private sanitizeImageUrl(): void {
    this.postImage = this.domSanitizer.bypassSecurityTrustUrl(
      this.post.thumbnail,
    );
  }

  private isLikedByLoggedUser(): void {
    if (this.jwtService.getAccessToken()) {
      const likes = this.likesService.getUsersLikesValue();
      this.isLiked = likes.some((like) => like.postId === this.post._id);
    }
  }
}
