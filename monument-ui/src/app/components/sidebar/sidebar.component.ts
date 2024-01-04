import { Component, OnInit } from '@angular/core';
import { LocalStorageKeys } from 'src/app/enums';
import { User, UsersPost } from 'src/app/models';
import { JwtService } from 'src/app/services/jwt.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit{
  public userId: string;

  constructor( private readonly jwtService: JwtService) {}

  public ngOnInit() {
    this.userId = this.jwtService.getLoggedUsersId()
  }
}
