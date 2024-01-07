import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { AuthApiService } from './auth-api.service';
import { LocalStorageKeys } from '../enums';
import { BehaviorSubject, Observable, finalize, take } from 'rxjs';
import { User } from '../models';
import { UserApiService } from './user-api.service';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private loggedUser: BehaviorSubject<any> = new BehaviorSubject<any>(
    undefined,
  );

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly userApiService: UserApiService,
    private readonly jwtService: JwtService,
    private readonly router: Router,
  ) {}

  public register(userName: string, email: string, password: string): void {
    this.authApiService.register({email: email, password: password, userName: userName}).pipe(take(1)).subscribe(()=> {
      this.router.navigate(['user-registered'])
    })
  }

  public login(email: string, password: string): void {
    this.authApiService
      .login({ email: email, password: password })
      .pipe(
        finalize(() => {
          window.location.reload();
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
      this.userApiService.fetchUser(loggedUsersId).subscribe((userResponse) => {
        this.loggedUser.next(userResponse);
      });
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
}
