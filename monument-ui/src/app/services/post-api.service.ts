import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {
  constructor(private http: HttpClient) {}

  public fetchAllPosts(): void {
    
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
