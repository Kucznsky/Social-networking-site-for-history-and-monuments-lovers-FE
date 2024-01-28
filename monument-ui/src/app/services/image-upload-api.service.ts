import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UPLOAD_IMG_URL } from '../consts/endpoint-url.const';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadApiService {

  constructor(private readonly http: HttpClient, private readonly jwtService: JwtService,) { }

  public uploadPostThumbnail(file: File): Observable<string> {
    const token = this.jwtService.getAccessToken();
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);

    const httpOptions = {
      headers: header,
    };

    return this.http.post<string>(`${UPLOAD_IMG_URL}/post-thumbnail`, file, httpOptions)
  }

  public uploadOtherImages(files: File[]): Observable<string[]> {
    const token = this.jwtService.getAccessToken();
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);

    const httpOptions = {
      headers: header,
    };

    return this.http.post<string[]>(`${UPLOAD_IMG_URL}/post-thumbnail`, files, httpOptions)
  }

  public uploadUserAvatar(file: File, userId: string): Observable<void> {
    const token = this.jwtService.getAccessToken();
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);

    const httpOptions = {
      headers: header,
    };

    const blb = {blb: file,}

    return this.http.post<void>(`${UPLOAD_IMG_URL}/user-avatar/${userId}`, blb, httpOptions)
  }
}
