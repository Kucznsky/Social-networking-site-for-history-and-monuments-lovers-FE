import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UsersPost } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {
  public posts: UsersPost[];
  private readonly unsubscriber: Subject<void> = new Subject();

  constructor( private readonly postService: PostService, private readonly changeDetectorRef: ChangeDetectorRef){}

  public ngOnInit() {
    this.postService.getAllPosts()
    this.observeListOfPosts()
  }

  public ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private observeListOfPosts(): void {
    this.postService.getPostsObservable().pipe(takeUntil(this.unsubscriber)).subscribe((posts)=> {
      this.posts = posts
      this.changeDetectorRef.markForCheck()
    })
  }
}
