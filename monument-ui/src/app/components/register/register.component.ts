import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() goToLogin = new EventEmitter();
  @ViewChild('openModalBtn') openModalBtn: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  public register(): void {}

  public redirectToLogin(): void {
    this.goToLogin.emit();
  }
}
