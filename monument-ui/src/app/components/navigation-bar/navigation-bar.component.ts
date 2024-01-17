import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { Subject } from 'rxjs';
import { UserAuthService } from '../../services/user-auth.service';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  @ViewChild(RegisterComponent) register: RegisterComponent;
  @ViewChild(LoginComponent) login: LoginComponent;
  public isUserLoggedIn: boolean;
  public isAuthScreenVisible: boolean;
  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly jwtService: JwtService,
    private readonly userAuthService: UserAuthService,
  ) {}

  public ngOnInit(): void {
    this.isUserLoggedIn = this.jwtService.isTokenValid();
    if (this.jwtService.isTokenValid()) {
      this.userAuthService.getLoggedUser();

    }
    this.observeRouterChange()
  }

  public ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public redirectToHomePage(): void {
    this.router.navigateByUrl('/home');
  }

  public openLoginModal(isRegisterModalOpen: boolean = true): void {
    if (isRegisterModalOpen) {
      this.register.closeBtn.nativeElement.click();
    }
    this.login.openModalBtn.nativeElement.click();
  }

  public openRegisterModal(): void {
    this.login.closeBtn.nativeElement.click();
    this.register.openModalBtn.nativeElement.click();
  }

  private observeRouterChange(): void {
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.isAuthScreenVisible= /auth/.test(this.router.url)
      }
    });
  }
}
