import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable, Subject, takeUntil} from 'rxjs';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { JwtService } from '../../services/jwt.service';
import { ImageUploadApiService } from '../../services/image-upload-api.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit, OnDestroy {
  public user: Observable<User>;
  public isLoggedUserPage: boolean
  public showImageDropzone = false;
  public newAvatar: File[] = []

  private userId: string;
  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly domSanitizer: DomSanitizer,
    private readonly imageUploadApiService: ImageUploadApiService,
    private readonly jwtService: JwtService,
  ) {}

  public ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.user = this.userService.getUserById(this.userId);
    this.checkIfIsLoggedUsersPage()
  }

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public sanitizeImageUrl(url: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  public getUserInitials(userName: string): string {
    return userName.charAt(0).toUpperCase();
  }

  public onSelect(event) {
    this.newAvatar = []
		this.newAvatar.push(...event.addedFiles);
	}

	public onRemove(event) {
		this.newAvatar.splice(this.newAvatar.indexOf(event), 1);
	}

  public uploadUserAvatar(): void {
    if(this.newAvatar){
      this.imageUploadApiService.uploadUserAvatar(this.newAvatar[0], this.userId).pipe(takeUntil(this.unsubscriber)).subscribe(()=>{
        setTimeout(() => {
          window.location.reload()
        }, 500);
      })
    }
  }

  public showOrHideImageDropzone(){
    this.showImageDropzone = !this.showImageDropzone
  }

  public getBtnLabel(): string {
    return this.showImageDropzone ? 'Cancel' : 'Change profile picture '
  }

  private checkIfIsLoggedUsersPage(): void {
    this.isLoggedUserPage = this.jwtService.isTokenValid() && this.userId === this.jwtService.getLoggedUsersId()
  }
}
