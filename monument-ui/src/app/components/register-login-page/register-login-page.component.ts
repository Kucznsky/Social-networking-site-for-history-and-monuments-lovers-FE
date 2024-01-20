import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-register-login-page',
  templateUrl: './register-login-page.component.html',
  styleUrls: ['./register-login-page.component.scss'],
})
export class RegisterLoginPageComponent implements OnInit {
  public isLoginFormVisible: boolean;
  public youDontHaveAnAccountMessage = `You don't have an account?`;
  public youAlreadyHaveAnAccountMessage = `You already have an account?`;

  public authFormGroup: FormGroup = new FormGroup({
    userName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private router: Router,
    private readonly userAuthService: UserAuthService,
  ) {}

  public ngOnInit(): void {
    this.isStringOrRegisterFormOpen();
  }

  private isStringOrRegisterFormOpen(): void {
    const urlFragment = new RegExp('login');

    this.isLoginFormVisible = urlFragment.test(this.router.url);
  }

  public loginOrRegister(): void {
    if (this.isLoginFormVisible) {
      this.logIn();
    } else {
      this.register();
    }
  }

  private logIn(): void {
    if (
      this.authFormGroup.get('email').valid &&
      this.authFormGroup.get('password').valid
    ) {
      this.userAuthService.login(
        this.authFormGroup.controls['email'].getRawValue(),
        this.authFormGroup.controls['password'].getRawValue(),
      );
    }
  }

  public register(): void {
    if (this.authFormGroup.valid) {
      this.userAuthService.register(
        this.authFormGroup.controls['userName'].getRawValue(),
        this.authFormGroup.controls['email'].getRawValue(),
        this.authFormGroup.controls['password'].getRawValue(),
      );
    }
  }

  public isFormErroneous(fieldName: string): boolean {
    return (
      (this.authFormGroup.get(fieldName).errors) &&
      (this.authFormGroup.get(fieldName).dirty ||
        this.authFormGroup.get(fieldName).touched)
    );
  }
}
