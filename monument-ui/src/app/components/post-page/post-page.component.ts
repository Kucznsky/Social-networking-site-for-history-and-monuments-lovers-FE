import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { User, UsersPost } from '../../models';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent implements OnInit, OnDestroy {
  public postId: string;
  public postAuthor: User;
  public postData: UsersPost;
  public userAvatar;
  public userThumbnail;
  public usersPlaceholerInitials: string;

  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly domSanitizer: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.postService
      .getPostById(this.postId)
      .pipe(
        switchMap((post) => {
          this.postData = post;
          return this.userService.getUserById(post.author.toString());
        }),
        takeUntil(this.unsubscriber),
      )
      .subscribe((user) => {
        this.postAuthor = user;
        this.changeDetectorRef.markForCheck();
        this.sanitizeImageUrl();
      });
  }

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private sanitizeImageUrl(): void {
    this.userThumbnail = this.domSanitizer.bypassSecurityTrustUrl(
      this.postData.thumbnail,
    );
    if (this.postAuthor.avatar) {
      this.userAvatar = this.domSanitizer.bypassSecurityTrustUrl(
        this.postAuthor.avatar,
      );
    } else {
      this.userAvatar = null;
      this.usersPlaceholerInitials = this.postAuthor.userName
        .charAt(0)
        .toUpperCase();
    }
  }
}
