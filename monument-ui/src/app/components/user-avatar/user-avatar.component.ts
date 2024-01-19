import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { User } from '../../models';
import { JwtService } from '../../services/jwt.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent implements OnInit, OnDestroy {
  public loggedUser: User;
  public loggedUserObservable: Observable<User>
  public usersAvatar;
  public usersPlaceholerInitials: string;

  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly jwtService: JwtService,
    private readonly domSanitizer: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.loggedUserObservable = this.userAuthService
    .getLoggedUserObservable()
    this.getLoggedUsersData();
  }

  public ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public logout(): void {
    this.jwtService.removeToken();
    this.userAuthService.resetLoggedUserData();
    window.location.reload();
  }

  private getLoggedUsersData(): void {
    this.userAuthService
      .getLoggedUserObservable()
      .pipe(filter((user)=>!!user),takeUntil(this.unsubscriber))
      .subscribe((user) => {
        this.loggedUser = user;
        this.sanitizeImageUrl();
        this.changeDetectorRef.markForCheck();
      });
  }

  private sanitizeImageUrl(): void {
    if (this.loggedUser?.avatar) {
      this.usersAvatar = this.domSanitizer.bypassSecurityTrustUrl(
        this.loggedUser?.avatar,
      );
    } else {
      this.usersAvatar = null;
      this.usersPlaceholerInitials = this.loggedUser.userName
        .charAt(0)
        .toUpperCase();
    }
  }
}
