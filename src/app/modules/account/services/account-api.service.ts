import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountCredentials } from '../models/account-credentials';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  private readonly apiUrl: string = environment.accountApiUrl;

  constructor(private httpClient: HttpClient) { }

  register(credentials: AccountCredentials) : Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/register`, credentials);
  }

  login(credentials: AccountCredentials) : Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  refresh(refreshToken: string) : Observable<AuthResponse> {
    return this.httpClient.get<AuthResponse>(`${this.apiUrl}/refresh/${refreshToken}`);
  }

  logout(refreshToken: string) : Observable<void> {
    return this.httpClient.get<void>(`${this.apiUrl}/logout/${refreshToken}`,);
  }
}
