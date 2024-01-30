import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UPLOAD_IMG_URL } from '../consts/endpoint-url.const';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
  ) {}

  public uploadPostThumbnail(file: File): Observable<string> {
    const token = this.jwtService.getAccessToken();
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);

    const httpOptions = {
      responseType: 'text',
      headers: header,
    };

    const body = new FormData();
    body.append('thumbnail', file);

    return this.http.post(`${UPLOAD_IMG_URL}/post-thumbnail`, body, {
      responseType: 'text',
      headers: header,
    });
  }

  // public uploadOtherImages(files: File[]): Observable<string[]> {
  //   const token = this.jwtService.getAccessToken();
  //   const header = new HttpHeaders();
  //   header.append('Content-Type', 'application/json');
  //   header.append('Authorization', 'Bearer ' + token);

  //   const httpOptions = {
  //     headers: header,
  //   };

  //   return this.http.post<string[]>(
  //     `${UPLOAD_IMG_URL}/post-thumbnail`,
  //     files,
  //     httpOptions,
  //   );
  // }

  public uploadUserAvatar(file: File, userId: string): Observable<void> {
    const token = this.jwtService.getAccessToken();
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);

    const httpOptions = {
      headers: header,
    };

    const body = new FormData();
    body.append('userAvatar', file);

    return this.http.post<void>(
      `${UPLOAD_IMG_URL}/user-avatar/${userId}`,
      body,
      httpOptions,
    );
  }
}
