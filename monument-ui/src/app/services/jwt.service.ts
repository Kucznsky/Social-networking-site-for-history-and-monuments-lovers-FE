import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeys } from '../enums';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(
    private readonly jwtHelperService: JwtHelperService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public getAccessToken(): string | null {
    return this.localStorageService.getItem(LocalStorageKeys.JWT);
  }

  public getLoggedUsersId(): string {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken = this.jwtHelperService.decodeToken(token);
      return decodedToken.sub;
    } else {
      return '';
    }
  }

  public isTokenValid(): boolean {
    const token = this.getAccessToken();
    if (token) {
      return !this.jwtHelperService.isTokenExpired(token);
    } else {
      return false;
    }
  }

  public saveTokenToStorage(token: string): void {
    this.localStorageService.setItem(LocalStorageKeys.JWT, token);
  }

  public removeToken(): void {
    this.localStorageService.removeItem(LocalStorageKeys.JWT);
  }
}
