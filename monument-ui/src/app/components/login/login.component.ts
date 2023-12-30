import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() goToRegister = new EventEmitter();
  @ViewChild('openModalBtn') openModalBtn: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private readonly userAuthService: UserAuthService) {}

  public loginFormGroup: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new UntypedFormControl(null, [Validators.required]),
  });

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
}
