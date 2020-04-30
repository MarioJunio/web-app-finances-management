import { HttpErrorHandlerService } from './http-error-handler.service';
import { AuthService } from './../seguranca/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(
    private errorHandler: HttpErrorHandlerService,
    private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // se o token estiver expirado, e nao for uma requisicao de renovacao, entao sera realizado a requisicao para renovar o token
    if (this.authService.tokenExpirado && !(String(req.body).includes('refresh_token'))) {

      return from(this.authService.renovarLogin())
        .pipe(switchMap(response => {

          const headers = req.headers
            .set('Authorization', 'Bearer ' + response.access_token)
            .append('Content-Type', 'application/json');

          const requestClone = req.clone({
            headers
          });

          return next.handle(requestClone);

        }), catchError(error => {
          this.authService.jwtToken = null;
          this.authService.apagarToken();
          this.errorHandler.handle(error);
          return next.handle(req);
        }));

    } else {
      return next.handle(req);
    }
  }

}
