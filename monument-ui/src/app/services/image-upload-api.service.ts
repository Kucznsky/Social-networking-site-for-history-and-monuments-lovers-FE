import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UPLOAD_IMG_URL } from '../consts/endpoint-url.const';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadApiService {

  constructor(private http: HttpClient) { }

  public uploadPostThumbnail(file: File): Observable<string> {
    return this.http.post<string>(`${UPLOAD_IMG_URL}/post-thumbnail`, file)
  }

  public uploadOtherImages(files: File[]): Observable<string[]> {
    return this.http.post<string[]>(`${UPLOAD_IMG_URL}/post-thumbnail`, files)
  }

  public uploadUserAvatar(file: File, userId: string): Observable<string> {
    return this.http.post<string>(`${UPLOAD_IMG_URL}/user-avatar/${userId}`, file)
  }
}
