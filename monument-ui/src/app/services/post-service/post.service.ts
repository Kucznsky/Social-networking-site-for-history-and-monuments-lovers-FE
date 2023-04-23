import { Injectable } from '@angular/core';
import { tap, Observable, BehaviorSubject, map } from 'rxjs';
import { PostApiService } from './post.api.service';
import { PostToDisplay } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: BehaviorSubject<PostToDisplay[]> = new BehaviorSubject<PostToDisplay[]>([]);

  constructor(
    private postApiService: PostApiService,
  ) {}

  public getAllPosts(): Observable<PostToDisplay[]> {
    // this.postApiService.fetchAllPosts().subscribe((posts) => {this.posts.next(posts)})
    this.postApiService.fetchAllPosts().subscribe((posts) => {this.posts.next(posts.map((post) => new PostToDisplay(post)))})
    return this.posts.asObservable()
  }


}
