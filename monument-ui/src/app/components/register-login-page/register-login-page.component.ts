import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { Subject, filter, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register-login-page',
  templateUrl: './register-login-page.component.html',
  styleUrls: ['./register-login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterLoginPageComponent implements OnInit, OnDestroy {
  public isLoginFormVisible: boolean;
  public errorMessage = '';
  public youDontHaveAnAccountMessage = `You don't have an account?`;
  public youAlreadyHaveAnAccountMessage = `You already have an account?`;

  public authFormGroup: FormGroup = new FormGroup({
    userName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private readonly userAuthService: UserAuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.isStringOrRegisterFormOpen();
    this.observeErrorMessageObs();
  }

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
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
      this.authFormGroup.get(fieldName).errors &&
      (this.authFormGroup.get(fieldName).dirty ||
        this.authFormGroup.get(fieldName).touched)
    );
  }

  private observeErrorMessageObs(): void {
    this.userAuthService
      .getErrorMessageObservable()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((message) => {
        this.errorMessage = message;
        if (this.errorMessage !== '') {
          setTimeout(() => {
            this.userAuthService.showErrorMessage('');
          }, 2000);
        }
        this.changeDetectorRef.markForCheck();
      });
  }
}
