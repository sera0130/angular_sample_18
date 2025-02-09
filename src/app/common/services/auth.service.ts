import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthConstants } from '../defines/constants/auth.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = AuthConstants.ONE_TIME_AUTH_TOKEN_KEY;

  constructor(private cookieService: CookieService) { }

  setAuthToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, undefined, '/');
  }

  getAuthToken(): string {
    return this.cookieService.get(this.tokenKey);
  }

  removeAuthToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
  }
}
