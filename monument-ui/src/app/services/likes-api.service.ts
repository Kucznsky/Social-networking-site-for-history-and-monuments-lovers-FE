import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LIKE_URL } from '../consts/endpoint-url.const';
import { LikeRequestBody } from '../interfaces/like-request-body.interface';

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
}
