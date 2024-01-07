import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_URL } from '../consts/endpoint-url.const';
import { UserResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  public fetchUser(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${USER_URL}/${id}`);
  }

  public fetchUserByUserName(userName: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${USER_URL}/userName/${userName}`);
  }

  public fetchUsersByPostId(postId): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(
      `${USER_URL}/commented-post/${postId}`,
    );
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${USER_URL}/${id}`);
  }
}
