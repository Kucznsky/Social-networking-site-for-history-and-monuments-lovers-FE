import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { LocalStorageKeys, SessionStorageKeys } from 'src/app/enums';
import { Subject, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  @ViewChild(RegisterComponent) register: RegisterComponent;
  @ViewChild(LoginComponent) login: LoginComponent;
  public isUserLoggedIn: boolean;
  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
    private readonly sessionStorageService: SessionStorageService,
  ) {}

  public ngOnInit(): void {
    this.isUserLoggedIn = !!this.localStorageService.getItem(LocalStorageKeys.JWT)
  }

  public ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public redirectToHomePage(): void {
    this.router.navigateByUrl('/home');
  }

  public openLoginModal(isRegisterModalOpen: boolean = true): void {
    if(isRegisterModalOpen){
      this.register.closeBtn.nativeElement.click();
    }
    this.login.openModalBtn.nativeElement.click();
  }

  public openRegisterModal(): void {
    this.login.closeBtn.nativeElement.click();
    this.register.openModalBtn.nativeElement.click();
  }

  // private observeSessionStorage(): void {
  //   of(
  //     this.sessionStorageService.getItem(
  //       SessionStorageKeys.ShouldOpenLoginModal,
  //     ),
  //   )
  //     .pipe(takeUntil(this.unsubscriber))
  //     .subscribe((item) => {
  //       if(item){
  //         this.openLoginModal(false);
  //       }
  //     });
  // }
}
