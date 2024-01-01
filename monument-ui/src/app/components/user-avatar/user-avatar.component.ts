import { Component } from '@angular/core';
import { LocalStorageKeys } from 'src/app/enums';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent {

  constructor( private readonly localStorageService: LocalStorageService, private readonly userAuthService: UserAuthService ){}

  public logout(): void {
    this.localStorageService.removeItem(LocalStorageKeys.JWT);
    this.userAuthService.resetLoggedUserData();
    window.location.reload()
  }
}
