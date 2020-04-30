import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {

  }

  // tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (state.url !== '/login' && !this.authService.autenticado) {
      this.authService.logout().then(() => {
        this.router.navigate(['login']);
      });

      return false;

    } else if (!this.authService.temPermissoes(route.data.roles)) {
      this.router.navigate(['acesso-negado']);
      return false;
    }

    return true;
  }

}
