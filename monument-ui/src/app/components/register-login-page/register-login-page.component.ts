import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-login-page',
  templateUrl: './register-login-page.component.html',
  styleUrls: ['./register-login-page.component.scss']
})
export class RegisterLoginPageComponent {
  constructor(private router : Router){}
}
