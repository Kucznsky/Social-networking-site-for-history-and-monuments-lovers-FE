import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { PostResponse } from '../../interfaces/post.interface';
import { PostMock } from 'src/app/mocks/post.mock';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  constructor(private http: HttpClient) {}

  public fetchAllPosts(): Observable<PostResponse[]> {
    return of(PostMock)
    //work in progress - backend is not ready yet
    //this.http.get<Post>('').subscribe()
    //return of(this.postMock.postsMock)
  }

  public fetchPost(id: string): void {
    //work in progress - backend is not ready yet
  }

  public deletePost(id: string): void {
    //work in progress - backend is not ready yet
  }

  public uploadPost(): void {
    //work in progress - backend is not ready yet
  }

  public editPost(id: string): void {
    //I'm not sure yet, if I'll allow to edit posts in the first version of the app
  }
}
