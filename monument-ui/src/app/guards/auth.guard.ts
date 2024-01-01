import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { LocalStorageKeys, SessionStorageKeys } from '../enums';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtHelperService: JwtHelperService,
    private readonly localStorageService: LocalStorageService,
    // private readonly sessionStorageService: SessionStorageService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const jwtToken = this.localStorageService.getItem(LocalStorageKeys.JWT);

    if (!jwtToken || this.jwtHelperService.isTokenExpired(jwtToken)) {
      // this.sessionStorageService.setItem(
      //   SessionStorageKeys.ShouldOpenLoginModal,
      //   true,
      // );
      return false;
    } else {
      return true;
    }
  }
}
