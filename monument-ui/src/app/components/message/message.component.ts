import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() title: string = `You have successfully created an account`;
  @Input() content: string =
    `To activate your account, click the link sent on your email address.` +
    `if you don't see the email in your inbox, check the spam tab.`;
}
