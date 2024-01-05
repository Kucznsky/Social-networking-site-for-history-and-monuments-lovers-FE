import { Component } from '@angular/core';
import { LocalStorageKeys } from 'src/app/enums';
import { JwtService } from 'src/app/services/jwt.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly jwtService: JwtService,
  ) {}

  public logout(): void {
    this.jwtService.removeToken();
    this.userAuthService.resetLoggedUserData();
    window.location.reload();
  }
}
