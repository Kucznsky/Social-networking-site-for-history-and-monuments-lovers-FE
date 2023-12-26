import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { NewPostComponent } from './components/new-post/new-post.component';

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
