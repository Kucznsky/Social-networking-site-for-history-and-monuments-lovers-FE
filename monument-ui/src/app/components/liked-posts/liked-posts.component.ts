import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersPost } from '../../models';
import { JwtService } from '../../services/jwt.service';
import { LikesService } from '../../services/likes.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-liked-posts',
  templateUrl: './liked-posts.component.html',
  styleUrls: ['./liked-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikedPostsComponent {
  public posts: UsersPost[];
  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly postService: PostService,
    private readonly likesService: LikesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly jwtService: JwtService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.getUsersLikes();
    this.postService.getAllPosts();
    this.observeListOfPosts();
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
        const likes = this.likesService.getUsersLikesValue()
        this.posts = posts.filter(
          (post) =>
            likes.some((like)=> like.postId === post._id)
        );
        this.posts.map((post)=> {return post.isLiked = true})
        this.changeDetectorRef.markForCheck();
      });
  }

  private getUsersLikes(): void {
    this.likesService.getUsersLikes(this.jwtService.getLoggedUsersId());
  }
}
