import { Injectable, OnDestroy } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, Observable, Subject, catchError, finalize, take, takeUntil } from 'rxjs';
import { User } from '../models';
import { UserApiService } from './user-api.service';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements OnDestroy {
  private loggedUser: BehaviorSubject<any> = new BehaviorSubject<any>(
    undefined,
  );
  private errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>(
    '',
  );

  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly userApiService: UserApiService,
    private readonly jwtService: JwtService,
    private readonly likeService: LikesService,
    private readonly router: Router,
  ) {}

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public register(userName: string, email: string, password: string): void {
    let failed: boolean;
    this.authApiService
      .register({ email: email, password: password, userName: userName })
      .pipe(
        takeUntil(this.unsubscriber),
        catchError((e) => {
          failed = true;
          this.showErrorMessage(e.error.message);
          return [];
        }),
      )
      .subscribe(() => {
        this.router.navigate(['user-registered']);
      });
  }

  public login(email: string, password: string): void {
    let failed: boolean;
    this.authApiService
      .login({ email: email, password: password })
      .pipe(
        takeUntil(this.unsubscriber),
        catchError((e) => {
          failed = true;
          this.showErrorMessage(e.error.message);
          return [];
        }),
        finalize(() => {
          if (!failed) {
            window.location.reload();
          }
        }),
      )
      .subscribe((response) => {
        const token = response.jwtToken.access_token;
        this.jwtService.saveTokenToStorage(token);
        this.getLoggedUser();
      });
  }

  public getLoggedUser(): void {
    if (this.jwtService.isTokenValid()) {
      const loggedUsersId = this.jwtService.getLoggedUsersId();
      this.userApiService.fetchUser(loggedUsersId).pipe(takeUntil(this.unsubscriber),).subscribe((userResponse) => {
        this.loggedUser.next(userResponse);
      });
      this.likeService.getUsersLikes(this.jwtService.getLoggedUsersId())
    }
  }

  public getLoggedUserObservable(): Observable<User> {
    return this.loggedUser.asObservable();
  }

  public getLoggedUserValue(): User {
    return this.loggedUser.value();
  }

  public resetLoggedUserData(): void {
    this.loggedUser.next(null);
  }

  public showErrorMessage(mesage: string): void {
    this.errorMessage.next(mesage);
  }

  public getErrorMessageObservable(): Observable<string> {
    return this.errorMessage.asObservable();
  }
}
