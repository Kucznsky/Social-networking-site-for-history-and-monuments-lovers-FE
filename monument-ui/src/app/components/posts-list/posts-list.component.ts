import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UsersPost } from 'src/app/models';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent {
  @Input() posts: UsersPost[];
  @Input() isUsersPostSection = false; 
}
