import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params });
  }

  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { headers });
  }

  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, { headers });
  }

  delete<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, { params });
  }
}