import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  public isUserLoggedIn = false;

  constructor(
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public ngOnInit(): void {}

  public redirectToHomePage(): void {
    this.router.navigateByUrl('/home');
  }
}
