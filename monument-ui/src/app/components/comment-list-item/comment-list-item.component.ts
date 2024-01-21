import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserComment } from 'src/app/models';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss'],
})
export class CommentListItemComponent implements OnInit {
  @Input() commentData: UserComment;

  public userAvatar;
  public usersPlaceholerInitials: string

  constructor(
    private domSanitizer: DomSanitizer,
  ) {}

  public ngOnInit(): void {
    this.sanitizeImageUrl();
  }

  private sanitizeImageUrl(): void {
    if(this.commentData.author.avatar){
      this.userAvatar = this.domSanitizer.bypassSecurityTrustUrl(
        this.commentData.author.avatar,
      );
    } else {
      this.userAvatar = null;
      this.usersPlaceholerInitials = this.commentData.author.userName
        .charAt(0)
        .toUpperCase();
    }
  }
}
