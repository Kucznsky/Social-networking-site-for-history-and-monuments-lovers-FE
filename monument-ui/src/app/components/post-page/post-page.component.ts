import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.postService
      .getPostById(this.postId)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((post) => {
        this.postData = post;
        this.userService
          .getUserById(post.author.toString())
          .pipe(takeUntil(this.unsubscriber))
          .subscribe((user) => {
            this.postAuthor = user;
            this.changeDetectorRef.markForCheck();
          });
        this.changeDetectorRef.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
