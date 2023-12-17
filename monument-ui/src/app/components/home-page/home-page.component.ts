import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsersPost } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  public posts: UsersPost[];
  public blb = [1,2,3,4,5,,6,7,8,9,10]

  constructor( public readonly postService: PostService){}

  ngOnInit() {
    this.postService.getAllPosts().subscribe((posts) => {
      console.log(posts)
      this.posts = posts;
      console.log(this.posts)
    })
  }
}
