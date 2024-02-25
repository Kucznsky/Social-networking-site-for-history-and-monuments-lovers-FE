import { Component } from '@angular/core';

@Component({
  selector: 'app-not-verified-message',
  templateUrl: './not-verified-message.component.html',
  styleUrls: ['./not-verified-message.component.scss'],
})
export class NotVerifiedMessageComponent {
  public title = `Verify your account`;
  public content =
    `In order to use features intended for logged users, you need to verify your account first. ` +
    `Please click on the link sent on your email address.`;
}
