import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LIKE_URL } from '../consts/endpoint-url.const';
import { LikeRequestBody, LikeResponseBody } from '../interfaces';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class LikesApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
  ) {}

  public addNewLike(body: LikeRequestBody): Observable<void> {
    const token = this.jwtService.getAccessToken();
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);

    const httpOptions = {
      headers: header,
    };

    return this.http.post<void>(`${LIKE_URL}`, body, httpOptions);
  }

  public removeLike(body: LikeRequestBody): Observable<void> {
    const token = this.jwtService.getAccessToken();
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);

    const httpOptions = {
      headers: header,
    };
    return this.http.post<void>(`${LIKE_URL}/remove`, body, httpOptions);
  }

  public fetchUserLikes(userId: string): Observable<LikeResponseBody[]> {
    const token = this.jwtService.getAccessToken();
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);

    const httpOptions = {
      headers: header,
    };
    return this.http.get<LikeResponseBody[]>(
      `${LIKE_URL}/${userId}`,
      httpOptions,
    );
  }
}
