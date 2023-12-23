import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LIKE_URL } from '../consts/endpoint-url.const';
import { LikeRequestBody, LikeResponseBody } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LikesApiService {
  constructor(private http: HttpClient) {}

  public addNewLike(body: LikeRequestBody): Observable<void> {
    return this.http.post<void>(`${LIKE_URL}`, body);
  }

  public removeLike(body: LikeRequestBody): Observable<void> {
    const options = { body: body };
    return this.http.post<void>(`${LIKE_URL}/remove`, options);
  }

  public fetchUserLikes(userId: string): Observable<LikeResponseBody[]> {
    return this.http.get<LikeResponseBody[]>(`${LIKE_URL}/${userId}`);
  }
}
