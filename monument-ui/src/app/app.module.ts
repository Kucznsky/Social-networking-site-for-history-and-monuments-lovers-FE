import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { SortComponent } from './components/filters/sorting.component';
import { PostPageComponent } from './components/post-page/post-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomePageComponent,
    SidebarComponent,
    PostListItemComponent,
    SortComponent,
    PostPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
