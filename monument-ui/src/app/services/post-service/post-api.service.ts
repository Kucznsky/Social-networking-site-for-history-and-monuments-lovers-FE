
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { Post, PostResponse } from '../../interfaces/post.interface';
import { PostMock } from 'src/app/mocks/post-mock';

@Injectable({
    providedIn: 'root'
  })

export class postApiService {
    constructor(
        private http: HttpClient, 
        private postMock: PostMock
    ) { }

    fetchAllPosts(): Observable<PostResponse> {
        //work in progress - backend is not ready yet
        //this.http.get<Post>('').subscribe()
        //return of(this.postMock.postsMock)
    }

    fetchPost(id: string): void {
    //work in progress - backend is not ready yet
    }

    deletePost(id: string): void {
    //work in progress - backend is not ready yet
    }

    uploadPost(): void{
    //work in progress - backend is not ready yet    
    }

    editPost(id: string): void {
    //I'm not sure yet, if I'll allow to edit posts in the first version of the app
    }


}