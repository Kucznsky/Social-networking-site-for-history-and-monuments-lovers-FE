import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, take } from 'rxjs';
import { Localisation, UsersPost } from '../models';
import { PostApiService } from './post-api.service';
import { ImageUploadApiService } from './image-upload-api.service';
import { Category } from '../enums';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private listOfPosts: BehaviorSubject<UsersPost[]> = new BehaviorSubject<
    UsersPost[]
  >([]);
  constructor(
    private readonly postApiService: PostApiService,
    private imageUploadApiService: ImageUploadApiService,
    private readonly router: Router,
  ) {}
  public getAllPosts(): void {
    this.postApiService.fetchAllPosts().subscribe((posts) => {
      this.listOfPosts.next(posts.map((post) => new UsersPost(post)));
    });
  }
  public getPostsObservable(): Observable<UsersPost[]> {
    return this.listOfPosts.asObservable();
  }

  public getPostById(postId: string): Observable<UsersPost> {
    return this.postApiService
      .fetchPost(postId)
      .pipe(map((post) => new UsersPost(post)));
  }

  public createPost(
    file: File,
    title: string,
    description: string,
    category: Category,
    localisation: Localisation,
    authorId: string,
  ): void {
    this.imageUploadApiService
      .uploadPostThumbnail(file)
      .pipe(
        switchMap((imageUrl: string) => {
          const body = {
            category: category,
            title: title,
            content: description,
            localisation: localisation,
            authorId: authorId,
            thumbnail: imageUrl,
          };
          return this.postApiService.uploadPost(body);
        }),
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

  public deletePost(postId: string): Observable<void> {
    return this.postApiService.deletePost(postId);
  }
}
