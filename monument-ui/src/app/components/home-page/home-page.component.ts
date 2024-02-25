import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { subDays } from 'date-fns/subDays';
import { Subject, take, takeUntil } from 'rxjs';
import { Category, SearchBy, SortingOptions } from 'src/app/enums';
import { User, UsersPost } from 'src/app/models';
import { JwtService } from 'src/app/services/jwt.service';
import { LikesService } from 'src/app/services/likes.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {
  public posts: UsersPost[];
  public filteredPosts: UsersPost[];
  public currentDate = new Date();
  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly postService: PostService,
    private readonly likesService: LikesService,
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly jwtService: JwtService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.postService.getAllPosts();
    this.observeListOfPosts();
    this.observeQueryParams();
    if (this.jwtService.isTokenValid()) {
      this.likesService.getUsersLikes(this.jwtService.getLoggedUsersId());
    }
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
      case SortingOptions.TopDay:
        this.filteredPosts = this.posts.filter(
          (post) =>
            new Date(post.published).getDate() ===
            new Date(this.currentDate).getDate(),
        );
        this.posts.sort((a, b) => {
          return b.numberOfLikes - a.numberOfLikes;
        });
        break;
      case SortingOptions.TopLastSevenDays:
        this.filteredPosts = this.posts.filter(
          (post) =>
            new Date(post.published).getTime() <=
              new Date(this.currentDate).getTime() &&
            new Date(post.published).getTime() >=
              subDays(new Date(this.currentDate), 7).getTime(),
        );
        this.filteredPosts.sort((a, b) => {
          return b.numberOfLikes - a.numberOfLikes;
        });
        break;
      case SortingOptions.TopThisMonth:
        this.filteredPosts = this.posts.filter(
          (post) =>
            new Date(post.published).getTime() <=
              new Date(this.currentDate).getTime() &&
            new Date(post.published).getTime() >=
              subDays(new Date(this.currentDate), 30).getTime(),
        );
        this.filteredPosts.sort((a, b) => {
          return b.numberOfLikes - a.numberOfLikes;
        });
        break;
      case SortingOptions.TopThisYear:
        this.filteredPosts = this.filteredPosts.filter(
          (post) =>
            new Date(post.published).getTime() <=
              new Date(this.currentDate).getTime() &&
            new Date(post.published).getTime() >=
              subDays(new Date(this.currentDate), 365).getTime(),
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

  public filterByCategory(activeFilters: Category[]): void {
    this.filteredPosts = this.posts.filter((post) =>
      activeFilters.some((filter) => filter === post.category),
    );
    this.changeDetectorRef.markForCheck();
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

  private observeQueryParams(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['searchBy']) {
        switch(params['searchBy']) {
          case SearchBy.Title:
            if (params['searchedPost'] === '') {
              this.filteredPosts = this.posts;
            } else {
              this.filteredPosts = this.posts.filter(
                (post) => post.title.toLocaleLowerCase().includes(params['searchedPost'].toLocaleLowerCase()),
              );
            }
            this.changeDetectorRef.markForCheck();
            break;
          case SearchBy.Localisation: 
            if (params['searchedPost'] === '') {
              this.filteredPosts = this.posts;
            } else {
              this.filteredPosts = this.posts.filter((post)=>post.localisation.localisationName.toLocaleLowerCase().includes(params['searchedPost'].toLocaleLowerCase()))
            }
            this.changeDetectorRef.markForCheck();
            break;
          case SearchBy.User:
            this.userService
            .getUserByUserName(params['searchedPost'])
            .pipe(takeUntil(this.unsubscriber))
            .subscribe((user) => {
              this.filteredPosts = this.posts.filter(
                (post) => post.author.toString() === user.id,
              );
              this.changeDetectorRef.markForCheck();
            });
            break;
        }
      } else {
        this.filteredPosts = this.posts;
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
