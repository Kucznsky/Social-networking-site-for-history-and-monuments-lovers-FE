import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  public getItem(key: string) {
    return sessionStorage.getItem(key);
  }

  public setItem(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  public removeItem(key: string) {
    sessionStorage.removeItem(key);
  }
}
