import { Injectable } from '@angular/core';
import { tap, Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { PostMock } from 'src/app/mocks/post-mock';

@Injectable({
    providedIn: 'root'
  })

export class postApiService {

    private posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([])

    constructor(
        private postApiService: postApiService,
        private postMock: PostMock,
    ) { }
    
    getAllPosts(): void {
        //this.postApiService.fetchAllPosts().subscribe((posts) => {this.posts.next(posts)})
        this.posts.next(this.postMock.postsMock)
    }

}