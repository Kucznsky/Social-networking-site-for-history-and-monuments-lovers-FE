import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-login-page',
  templateUrl: './register-login-page.component.html',
  styleUrls: ['./register-login-page.component.scss']
})
export class RegisterLoginPageComponent implements OnInit{
  public isLoginFormVisible: boolean;


  constructor(private router : Router){}

  public ngOnInit(): void {
    this.isStringOrRegisterFormOpen();
  }

  private isStringOrRegisterFormOpen(): void {
    const urlFragment = new RegExp('login')

    this.isLoginFormVisible = urlFragment.test(this.router.url)
  }
}
