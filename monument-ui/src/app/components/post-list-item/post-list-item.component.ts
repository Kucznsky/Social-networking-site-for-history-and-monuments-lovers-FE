import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersPost } from 'src/app/models';
import { LikesService } from 'src/app/services/likes.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss'],
})
export class PostListItemComponent implements OnDestroy {
  @Input() post: UsersPost;
  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly likesService: LikesService,
    private readonly router: Router,
  ) {}

  public ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public addRemoveLike(isLiked: boolean): void {
    if (isLiked) {
      this.likesService
        .removeLike('userIdPlaceholder', this.post._id)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe(() => {
          this.post.isLiked = !isLiked;
          this.post.numberOfLikes += 1;
        });
    } else {
      this.likesService
        .addLike('userIdPlaceholder', this.post._id)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe(() => {
          this.post.isLiked = !isLiked;
          this.post.numberOfLikes += 1;
        });
    }
  }

  public navigateToPostPage(postId: string): void {
    this.router.navigateByUrl(`/post/${postId}`);
  }
}
