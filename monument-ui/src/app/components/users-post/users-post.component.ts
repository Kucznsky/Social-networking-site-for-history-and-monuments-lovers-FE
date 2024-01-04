import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersPost } from 'src/app/models';
import { LikesService } from 'src/app/services/likes.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-users-post',
  templateUrl: './users-post.component.html',
  styleUrls: ['./users-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPostComponent implements OnInit, OnDestroy {
  public posts: UsersPost[];
  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly postService: PostService,
    private readonly likesService: LikesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ){}

  public ngOnInit(): void {
    this.postService.getAllPosts();
    this.observeListOfPosts();
    // this.likesService.getUsersLikes('somePlaceholder');
    // this.observeUsersLikes();
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
        this.posts = posts.filter((post)=> post.author.toString() === this.activatedRoute.snapshot.paramMap.get('id'));
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
