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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  @Output() goToLogin = new EventEmitter();
  @ViewChild('openRegisterModalBtn') openRegisterModalBtn: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  //TODO add confirmPassword validation
  // public registerFormGroup: FormGroup = new FormGroup({
  //   userName: new FormControl<string>('', [Validators.required]),
  //   email: new FormControl<string>('', [
  //     Validators.required,
  //     Validators.email,
  //   ]),
  //   password: new FormControl<string>('', [Validators.required]),
  //   confirmPassword: new FormControl<string>('', [Validators.required]),
  // }, confirmPasswordValidator);

  public errorMessage = '';

  public registerFormGroup: FormGroup = new FormGroup({
    userName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      ,
      Validators.minLength(8),
    ]),
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

  public register(): void {
    if (this.registerFormGroup.valid) {
      this.userAuthService.register(
        this.registerFormGroup.controls['userName'].getRawValue(),
        this.registerFormGroup.controls['email'].getRawValue(),
        this.registerFormGroup.controls['password'].getRawValue(),
      );
    }
  }

  public redirectToLogin(): void {
    this.goToLogin.emit();
  }

  public isFormErroneous(fieldName: string): boolean {
    return (
      this.registerFormGroup.get(fieldName).errors &&
      (this.registerFormGroup.get(fieldName).dirty ||
        this.registerFormGroup.get(fieldName).touched)
    );
  }

  private observeErrorMessageObs(): void {
    this.userAuthService
      .getErrorMessageObservable()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((message) => {
        this.errorMessage = message;
        if (this.errorMessage !== '') {
          this.openRegisterModalBtn.nativeElement.click();
          setTimeout(() => {
            this.userAuthService.showErrorMessage('');
          }, 2000);
        }
        this.changeDetectorRef.markForCheck();
      });
  }
}
