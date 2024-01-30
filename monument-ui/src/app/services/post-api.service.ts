import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostResponse } from '../interfaces';
import { POST_URL } from '../consts/endpoint-url.const';
import { NewPost } from '../models';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  constructor(
    private http: HttpClient,
    private readonly jwtService: JwtService,
  ) {}

  public fetchAllPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${POST_URL}/all`);
  }

  public fetchPost(id: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${POST_URL}/${id}`);
  }

  public deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${POST_URL}/${id}`);
  }

  public uploadPost(body: NewPost): Observable<PostResponse> {
    const token = this.jwtService.getAccessToken();
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);

    console.log(body);

    const httpOptions = {
      headers: header,
    };

    return this.http.post<PostResponse>(`${POST_URL}`, body, httpOptions);
  }

  public editPost(body: NewPost, id: string): Observable<PostResponse> {
    return this.http.put<PostResponse>(`${POST_URL}/${id}`, body);
    //I'm not sure yet, if I'll allow to edit posts in the first version of the app
  }
}
