import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { AuthApiService } from './auth-api.service';
import { LocalStorageKeys } from '../enums';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { User } from '../models';
import { UserApiService } from './user-api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private loggedUser: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly userApiService: UserApiService,
    private readonly localStorageService: LocalStorageService,
    private jwtHelperService: JwtHelperService,
  ) {}

  public login(email: string, password: string): void {
    this.authApiService
      .login({ email: email, password: password })
      .pipe(finalize(()=>{window.location.reload()}))
      .subscribe((response) => {
        const token = response.jwtToken.access_token;
        this.localStorageService.setItem(LocalStorageKeys.JWT, token);
        const tokenData = this.jwtHelperService.decodeToken(token);
        this.userApiService
          .fetchUser(tokenData.sub)
          .subscribe((userResponse) => {
            this.loggedUser.next(userResponse);
          });
        // console.log(this.jwtHelperService.decodeToken(token))
      });
  }

  public getLoggedUserObservable(): Observable<User> {
    return this.loggedUser.asObservable();
  }

  public resetLoggedUserData(): void {
    this.loggedUser.next(null)
  }
}
