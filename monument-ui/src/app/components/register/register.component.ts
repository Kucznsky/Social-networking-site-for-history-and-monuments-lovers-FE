import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { confirmPasswordValidator } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() goToLogin = new EventEmitter();
  @ViewChild('openModalBtn') openModalBtn: ElementRef;
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

  public registerFormGroup: FormGroup = new FormGroup({
    userName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(private readonly userAuthService: UserAuthService) {}

  public register(): void {
    if (this.registerFormGroup.valid) {
      this.userAuthService.register(
        this.registerFormGroup.controls['userName'].getRawValue(),
        this.registerFormGroup.controls['email'].getRawValue(),
        this.registerFormGroup.controls['password'].getRawValue(),
      );
    } else {
      console.log('blb')
    }
  }

  public redirectToLogin(): void {
    this.goToLogin.emit();
  }
}
