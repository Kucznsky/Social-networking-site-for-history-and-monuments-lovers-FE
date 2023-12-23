import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsersPost } from 'src/app/models';
import { LikesService } from 'src/app/services/likes.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {
  private readonly unsubscriber: Subject<void> = new Subject();

  public posts: UsersPost[];

  constructor(
    private readonly postService: PostService,
    private readonly likesService: LikesService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.postService.getAllPosts();
    this.observeListOfPosts();
    this.likesService.getUsersLikes('somePlaceholder');
    this.observeUsersLikes();
  }

  public ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private observeListOfPosts(): void {
    this.postService
      .getPostsObservable()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((posts) => {
        this.posts = posts;
        this.changeDetectorRef.markForCheck();
      });
  }

  private observeUsersLikes(): void {
    this.likesService
      .getUsersLikesObservable()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((likes) => {
        this.posts.forEach((post) => {
          if (likes.some((like) => like.postId === post._id)) {
            post.isLiked = true;
          }
          this.changeDetectorRef.detectChanges();
        });
      });
  }
}
