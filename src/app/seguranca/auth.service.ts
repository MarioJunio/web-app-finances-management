import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  TOKEN = 'access_token';

  private jwtHelper: JwtHelperService;
  private url = `${environment.apiUrl}/oauth/token`;
  private urlLogout = `${environment.apiUrl}/tokens/logout`;

  jwtToken: any;

  constructor(
    private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
    this.recoverTokenLocalStorage();
  }

  ngOnInit(): void {
  }

  public get autenticado(): boolean {
    return this.jwtToken;
  }

  public get tokenExpirado(): boolean {
    return this.jwtToken && this.jwtHelper.isTokenExpired(localStorage.getItem(this.TOKEN));
  }

  public temPermissao(authority: string): boolean {
    return this.jwtToken && this.jwtToken.authorities && this.jwtToken.authorities.includes(authority);
  }

  public temPermissoes(authorities: string[]): boolean {

    for (const a of authorities) {

      if (this.temPermissao(a)) {
        return true;
      }
    }

    return false;
  }

  public renovarLogin(): Promise<any> {
    return this.autenticar('grant_type=refresh_token');
  }

  public login(email: string, senha: string): Promise<any> {
    const body = `username=${email}&password=${senha}&grant_type=password`;
    return this.autenticar(body);
  }

  public logout(): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bGFy');

    return this.http
      .delete(this.urlLogout, { headers, withCredentials: true })
      .toPromise()
      .then(() => {
        this.apagarToken();
        this.jwtToken = null;

        Promise.resolve();
      }).catch(error => {
        console.log(error);
        Promise.reject(error);
      });

  }

  private autenticar(body: string): Promise<any> {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bGFy');

    return this.http.post(this.url, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.setTokenLocalStorage(response[this.TOKEN]);
        this.recoverTokenLocalStorage();

        return Promise.resolve(response);
      }).catch(error => {

        if (error.error.error === 'invalid_grant') {
          return Promise.reject('Credenciais inválidas');
        }

        return Promise.reject(error);
      });
  }

  public setTokenLocalStorage(token: string): void {
    localStorage.setItem(this.TOKEN, token);
  }

  public recoverTokenLocalStorage(): any {
    this.jwtToken = this.jwtHelper.decodeToken(localStorage.getItem(this.TOKEN));
  }

  public apagarToken(): void {
    localStorage.removeItem(this.TOKEN);
  }
}
