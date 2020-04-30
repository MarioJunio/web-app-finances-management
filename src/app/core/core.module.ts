import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { ToastyModule } from 'ng2-toasty';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { ModelModule } from './../model/model.module';
import { CategoriasModule } from './../categorias/categorias.module';
import { SegurancaModule } from '../seguranca/seguranca.module';

import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthHttpInterceptor } from './auth-http-interceptor';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

import { AuthService } from '../seguranca/auth.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';


registerLocaleData(localePt);

export function jwtTokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [SidenavMenuComponent, NavbarComponent, PaginaNaoEncontradaComponent, AcessoNegadoComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ToastyModule.forRoot(),
    HttpClientModule,
    CategoriasModule,
    SegurancaModule,
    ModelModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: ['localhost:8080', 'mjmoney-api.herokuapp.com'],
        blacklistedRoutes: [],
        skipWhenExpired: true
      }
    })
  ],
  exports: [
    SidenavMenuComponent,
    NavbarComponent,
    ToastyModule,
    HttpClientModule,
    NoopAnimationsModule
  ],
  providers: [
    HttpErrorHandlerService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
