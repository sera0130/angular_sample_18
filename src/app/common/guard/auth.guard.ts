import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthConstants } from '../defines/constants/auth.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(): boolean {
    const authToken = this.cookieService.get(AuthConstants.ONE_TIME_AUTH_TOKEN_KEY);
    if (authToken) {
      return true;
    } else {
      this.router.navigate(['/page/page1']);
      return false;
    }
  }
}
