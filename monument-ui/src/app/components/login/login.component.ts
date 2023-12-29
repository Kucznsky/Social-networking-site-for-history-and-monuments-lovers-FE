import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() goToRegister = new EventEmitter()
  @ViewChild("openModalBtn") openModalBtn: ElementRef;
  @ViewChild("closeBtn") closeBtn: ElementRef;
  public loginFormGroup: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email]),
    password: new UntypedFormControl(null, [Validators.required]),
  });

  public logIn(): void {
    console.log(this.loginFormGroup.controls['email'])
    console.log(this.loginFormGroup.controls['password'])
  }

  public redirectToRegister(): void {
    this.goToRegister.emit()
  }
}
