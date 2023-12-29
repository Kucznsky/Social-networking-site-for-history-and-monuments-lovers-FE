import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  @ViewChild(RegisterComponent) register: RegisterComponent;
  @ViewChild(LoginComponent) login: LoginComponent;
  public isUserLoggedIn = false;

  constructor(
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public ngOnInit(): void {}

  public redirectToHomePage(): void {
    this.router.navigateByUrl('/home');
  }

  public openLoginModal(): void {
    this.register.closeBtn.nativeElement.click()
    this.login.openModalBtn.nativeElement.click()
  }

  public openRegisterModal(): void {
    this.login.closeBtn.nativeElement.click()
    this.register.openModalBtn.nativeElement.click()
  }
}
