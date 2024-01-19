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

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomePageComponent,
        data: {
          //permissions
        },
      },
      {
        path: 'post/:id',
        component: PostPageComponent,
        data: {
          //permissions
        },
      },
      {
        path: 'new-post',
        component: NewPostComponent,
        data: {
          //permissions
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'users-posts/:id',
        component: UsersPostComponent,
        data: {
          //permissions
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'liked-posts/:id',
        component: LikedPostsComponent,
        data: {
          //permissions
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'user-registered',
        component: MessageComponent,
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
