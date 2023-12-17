import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersPost } from '../models/post.model';
import { PostApiService } from './post-api.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: BehaviorSubject<UsersPost[]> = new BehaviorSubject<
    UsersPost[]
  >([]);

  constructor(private postApiService: PostApiService) {}

  public getAllPosts(): Observable<UsersPost[]> {
    this.postApiService.fetchAllPosts().subscribe((posts) => {
      this.posts.next(posts.map((post) => new UsersPost(post)));
    });
    return this.posts.asObservable();
  }
}
