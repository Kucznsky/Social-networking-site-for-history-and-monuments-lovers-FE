import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() goToRegister = new EventEmitter();
  @ViewChild('openLoginModalBtn') openLoginModalBtn: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  public errorMessage = '';

  public loginFormGroup: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new UntypedFormControl(null, [Validators.required]),
  });

  private readonly unsubscriber: Subject<void> = new Subject();

  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.observeErrorMessageObs();
  }

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public logIn(): void {
    if (this.loginFormGroup.valid) {
      this.userAuthService.login(
        this.loginFormGroup.controls['email'].getRawValue(),
        this.loginFormGroup.controls['password'].getRawValue(),
      );
    }
  }

  public redirectToRegister(): void {
    this.goToRegister.emit();
  }

  public isFormErroneous(fieldName: string): boolean {
    return (
      this.loginFormGroup.get(fieldName).errors &&
      (this.loginFormGroup.get(fieldName).dirty ||
        this.loginFormGroup.get(fieldName).touched)
    );
  }

  private observeErrorMessageObs(): void {
    this.userAuthService
      .getErrorMessageObservable()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((message) => {
        this.errorMessage = message;
        if (this.errorMessage !== '') {
          this.openLoginModalBtn.nativeElement.click();
          setTimeout(() => {
            this.userAuthService.showErrorMessage('');
          }, 2000);
        }
        this.changeDetectorRef.markForCheck();
      });
  }
}
