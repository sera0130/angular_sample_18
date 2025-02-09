import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private cookieService: CookieService) { }

  setToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, undefined, '/');
  }

  getToken(): string {
    return this.cookieService.get(this.tokenKey);
  }

  removeToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
  }
}
