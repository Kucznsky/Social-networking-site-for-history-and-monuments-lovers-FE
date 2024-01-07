import { Injectable } from '@angular/core';
import { CommentRequestBody, CommentResponse } from '../interfaces';
import { Observable, map } from 'rxjs';
import { JwtService } from './jwt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { COMMENT_URL } from '../consts/endpoint-url.const';

@Injectable({
  providedIn: 'root',
})
export class CommentApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
  ) {}

  public createComment(body: CommentRequestBody): Observable<CommentResponse> {
    const token = this.jwtService.getAccessToken();
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);

    const httpOptions = {
      headers: header,
    };
    return this.http.post<any>(`${COMMENT_URL}`, body, httpOptions).pipe(map((response)=> response.createdComment));
  }

  public getComments(postId): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(`${COMMENT_URL}/${postId}`);
  }
}
