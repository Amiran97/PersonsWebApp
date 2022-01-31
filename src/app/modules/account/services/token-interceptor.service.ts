import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap } from 'rxjs';
import { AccountApiService } from './account-api.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService,
    private accountApi: AccountApiService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestWithToken = this.addAccessToken(request); 
    return next.handle(requestWithToken).pipe(
      catchError(error => {
        if (error.status == 401) {
           return this.handleError(request, next);
        }
        else {
          return next.handle(requestWithToken);
        }
      })
    );
  }

  addAccessToken(request: HttpRequest<any>) : HttpRequest<any> {
    if (this.tokenStorage.accessToken)
      return request.clone({setHeaders: { 'Authorization': `Bearer ${this.tokenStorage.accessToken}` }});
    else
      return request;
  }

  handleError(request: HttpRequest<any>, next: HttpHandler) {
    return this.accountApi.refresh(this.tokenStorage.refreshToken as string).pipe(
      switchMap(response => {
        this.tokenStorage.setTokens(response.accessToken, response.refreshToken);
        let authRequest = this.addAccessToken(request);
        return next.handle(authRequest);      
      }));
  } 
}
