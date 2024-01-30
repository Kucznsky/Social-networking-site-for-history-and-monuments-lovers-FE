import { Injectable, OnDestroy } from '@angular/core';
import { LikesApiService } from './likes-api.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { LikeResponseBody } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LikesService implements OnDestroy {
  private usersLikes: BehaviorSubject<LikeResponseBody[]> = new BehaviorSubject<
    LikeResponseBody[]
  >([]);

  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(private readonly likesApiService: LikesApiService) {}

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public addLike(userId: string, postId: string): Observable<void> {
    return this.likesApiService.addNewLike({ userId, postId });
  }

  public removeLike(userId: string, postId: string): Observable<void> {
    return this.likesApiService.removeLike({ userId, postId });
  }

  public getUsersLikes(userId: string): void {
    this.likesApiService
      .fetchUserLikes(userId)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((usersLikes) => {
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
