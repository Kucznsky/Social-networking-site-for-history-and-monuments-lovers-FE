import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersPostComponent } from './components/users-post/users-post.component';
import { LikedPostsComponent } from './components/liked-posts/liked-posts.component';
import { RegisterComponent } from './components/register/register.component';
import { MessageComponent } from './components/message/message.component';
import { RegisterLoginPageComponent } from './components/register-login-page/register-login-page.component';
import { AuthenticationPageGuard } from './guards/authentication-page.guard';
import { UserPageComponent } from './components/user-page/user-page.component';
import { NotVerifiedMessageComponent } from './not-verified-message/not-verified-message.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomePageComponent,
        data: {},
      },
      {
        path: 'post/:id',
        component: PostPageComponent,
        data: {},
      },
      {
        path: 'new-post',
        component: NewPostComponent,
        data: {},
        canActivate: [AuthGuard],
      },
      {
        path: 'users-posts/:id',
        component: UsersPostComponent,
        data: {},
        canActivate: [AuthGuard],
      },
      {
        path: 'liked-posts/:id',
        component: LikedPostsComponent,
        data: {},
        canActivate: [AuthGuard],
      },
      {
        path: 'user-registered',
        component: MessageComponent,
      },
      {
        path: 'not-verified',
        component: NotVerifiedMessageComponent,
      },
      {
        path: 'auth/login',
        component: RegisterLoginPageComponent,
        canActivate: [AuthenticationPageGuard],
      },
      {
        path: 'auth/register',
        component: RegisterLoginPageComponent,
        canActivate: [AuthenticationPageGuard],
      },
      {
        path: 'user/:userId',
        component: UserPageComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
