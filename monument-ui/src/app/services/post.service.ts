import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { UsersPost } from '../models';
import { PostApiService } from './post-api.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private listOfPosts: BehaviorSubject<UsersPost[]> = new BehaviorSubject<
    UsersPost[]
  >([]);
  private post: BehaviorSubject<UsersPost> = new BehaviorSubject<
  UsersPost
>(undefined);

  constructor(private postApiService: PostApiService) {}

  public getAllPosts(): void {
    this.postApiService.fetchAllPosts().subscribe((posts) => {
      this.listOfPosts.next(posts.map((post) => new UsersPost(post)));
    });
  }

  public getPostsObservable(): Observable<UsersPost[]> {
    return this.listOfPosts.asObservable();
  }

  public getPostById(postId: string): Observable<UsersPost> {
    return this.postApiService.fetchPost(postId).pipe(map((post)=>new UsersPost(post)))
  }

  // public getPostValue(): UsersPost {
  //   return this.post.getValue()
  // }
}
