import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { User } from '../models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private userApiService: UserApiService) {}

  public getUserById(userId: string): Observable<User> {
    return this.userApiService.fetchUser(userId).pipe(map((user)=>new User(user)))
  }

  public getUserByUserName(userName: string): Observable<User>{
    return this.userApiService.fetchUserByUserName(userName).pipe(map((user)=>new User(user)))
  }
}
