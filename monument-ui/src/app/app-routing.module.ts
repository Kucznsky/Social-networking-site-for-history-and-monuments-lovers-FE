import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDashboardComponent } from './pages/post-dashboard/post-dashboard.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { SavedPostsComponent } from './pages/saved-posts/saved-posts.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: PostDashboardComponent,
        data: {
          //permissions
        },
      },
      {
        path: 'user-page/:id',
        component: UserPageComponent,
        data: {
          //permissions
        },
      },
      {
        path: 'user-posts/:id',
        component: UserPostsComponent,
        data: {
          //permissions
        },
      },
      {
        path: 'create-post',
        component: CreatePostComponent,
        data: {
          //permissions
        }, //canActivate: some component checking if use is logged
      },
      {
        path: 'post/:id',
        component: PostPageComponent,
        data: {
          //permissions
        },
      },
      {
        path: 'saved-posts/:id',
        component: SavedPostsComponent,
        data: {
          //permissions
        },
        //canActivate: some component checking if use is logged
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        //canActivate: some component checking if use is logged
      },
      {
        path: 'register',
        component: RegisterComponent,
        //canActivate: some component checking if use is logged
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
