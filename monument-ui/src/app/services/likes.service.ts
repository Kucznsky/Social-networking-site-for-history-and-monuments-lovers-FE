import { Injectable } from '@angular/core';
import { LikesApiService } from './likes-api.service';
import { BehaviorSubject, Observable, take, takeUntil } from 'rxjs';
import { LikeResponseBody } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private usersLikes: BehaviorSubject<LikeResponseBody[]> = new BehaviorSubject<
    LikeResponseBody[]
  >([]);

  constructor(private readonly likesApiService: LikesApiService) {}

  public addLike(userId: string, postId: string): Observable<void> {
    return this.likesApiService.addNewLike({ userId, postId });
  }

  public removeLike(userId: string, postId: string): Observable<void> {
    return this.likesApiService.removeLike({ userId, postId });
  }

  public getUsersLikes(userId: string): void {
    this.likesApiService.fetchUserLikes(userId).pipe(take(1)).subscribe((usersLikes) => {
      this.usersLikes.next(usersLikes);
    });
  }

  public getUsersLikesObservable(): Observable<LikeResponseBody[]> {
    return this.usersLikes.asObservable();
  }

  public getUsersLikesValue(): LikeResponseBody[] {
    return this.usersLikes.getValue();
  }
}
