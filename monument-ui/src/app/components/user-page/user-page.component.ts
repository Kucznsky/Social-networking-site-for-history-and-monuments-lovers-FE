import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent implements OnInit, OnDestroy {
  public user: Observable<User>;

  private userId: string;
  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly domSanitizer: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.user = this.userService.getUserById(this.userId);
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
}
