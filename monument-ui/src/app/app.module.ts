import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { SortComponent } from './components/filters/sorting.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { SearchComponent } from './components/search/search.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UsersPostComponent } from './components/users-post/users-post.component';
import { LikedPostsComponent } from './components/liked-posts/liked-posts.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { MessageComponent } from './components/message/message.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { CommentListItemComponent } from './components/comment-list-item/comment-list-item.component';
import { RegisterLoginPageComponent } from './components/register-login-page/register-login-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { MapComponentComponent } from './map-component/map-component.component';
import { NotVerifiedMessageComponent } from './not-verified-message/not-verified-message.component';

export function tokenGetter() {
  return localStorage.getItem('jwt_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomePageComponent,
    SidebarComponent,
    PostListItemComponent,
    SortComponent,
    PostPageComponent,
    SearchComponent,
    NewPostComponent,
    LoginComponent,
    RegisterComponent,
    UsersPostComponent,
    LikedPostsComponent,
    UserAvatarComponent,
    PostsListComponent,
    MessageComponent,
    CommentSectionComponent,
    CommentListItemComponent,
    RegisterLoginPageComponent,
    UserPageComponent,
    MapComponentComponent,
    NotVerifiedMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
