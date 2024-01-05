import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UsersPost } from 'src/app/models';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  @Input() posts: UsersPost[];
  @Input() isUsersPostSection = false;

  public userId: string

  constructor(private readonly jwtService: JwtService){}

  public ngOnInit(): void {
    if(this.jwtService.isTokenValid()){
      this.userId = this.jwtService.getLoggedUsersId()
    }
  }
}
