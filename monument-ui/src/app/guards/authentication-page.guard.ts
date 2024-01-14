import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationPageGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (this.jwtService.isTokenValid()) {
        this.router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
  }
  
}
