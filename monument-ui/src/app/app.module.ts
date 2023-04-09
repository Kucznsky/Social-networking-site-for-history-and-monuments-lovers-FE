import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostDashboardComponent } from './pages/post-dashboard/post-dashboard.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { PostDashboardTableItemComponent } from './components/post-dashboard-table-item/post-dashboard-table-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from './components/logout/logout.component';
import { SearchComponent } from './components/search/search.component';
import { CommentsDashboardComponent } from './components/comments-dashboard/comments-dashboard.component';
import { CommentComponent } from './components/comment/comment.component';
import { SavedPostsComponent } from './pages/saved-posts/saved-posts.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { InteractiveMapComponent } from './components/interactive-map/interactive-map.component';

@NgModule({
  declarations: [
    AppComponent,
    PostPageComponent,
    CreatePostComponent,
    UserPageComponent,
    PostDashboardComponent,
    PostDashboardTableItemComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    SearchComponent,
    CommentsDashboardComponent,
    CommentComponent,
    SavedPostsComponent,
    UserPostsComponent,
    InteractiveMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
