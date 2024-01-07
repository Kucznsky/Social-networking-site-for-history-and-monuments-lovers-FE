import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, userCredentials } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { AUTH_URL } from '../consts/endpoint-url.const';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  public login(body: userCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${AUTH_URL}/login`, body);
  }

  public register(body: userCredentials): Observable<void> {
    return this.http.post<void>(`${AUTH_URL}/register`, body);
  }
}
