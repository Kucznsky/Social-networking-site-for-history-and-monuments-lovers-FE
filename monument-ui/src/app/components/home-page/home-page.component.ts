import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SortingOptions } from 'src/app/enums';
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
  public filteredPosts: UsersPost[];
  public currentDate = new Date();

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

  public sortBy(selectedOption: SortingOptions) {
    switch (selectedOption) {
      case SortingOptions.New:
        this.filteredPosts = this.posts;
        this.filteredPosts.sort((a, b) => {
          return (
            new Date(b.published).getTime() - new Date(a.published).getTime()
          );
        });
        break;
      case SortingOptions.TopToday:
        this.filteredPosts = this.posts.filter(
          (post) =>
            new Date(post.published).getDate() ===
            new Date(this.currentDate).getDate(),
        );
        this.posts.sort((a, b) => {
          return b.numberOfLikes - a.numberOfLikes;
        });
        break;
      case SortingOptions.TopThisWeek:
        this.filteredPosts = this.posts.filter(
          (post) =>
            post.published.getDate() >= this.currentDate.getDate() &&
            post.published.getDate() <= this.currentDate.getDate() - 7,
        );
        this.filteredPosts.sort((a, b) => {
          return b.numberOfLikes - a.numberOfLikes;
        });
        break;
      case SortingOptions.TopThisMonth:
        this.filteredPosts = this.posts.filter(
          (post) =>
            post.published.getDate() >= this.currentDate.getDate() &&
            post.published.getDate() <= this.currentDate.getDate() - 30,
        );
        this.filteredPosts.sort((a, b) => {
          return b.numberOfLikes - a.numberOfLikes;
        });
        break;
      case SortingOptions.TopThisYear:
        this.filteredPosts = this.filteredPosts.filter(
          (post) =>
            post.published.getDate() >= this.currentDate.getDate() &&
            post.published.getDate() <= this.currentDate.getDate() - 365,
        );
        this.filteredPosts.sort((a, b) => {
          return b.numberOfLikes - a.numberOfLikes;
        });
        break;
      default:
        this.filteredPosts = this.posts;
        this.filteredPosts.sort((a, b) => {
          return b.numberOfLikes - a.numberOfLikes;
        });
        break;
    }
  }

  private observeListOfPosts(): void {
    this.postService
      .getPostsObservable()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((posts) => {
        this.posts = posts;
        this.filteredPosts = posts.sort((a, b) => {
          return b.numberOfLikes - a.numberOfLikes;
        });
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
