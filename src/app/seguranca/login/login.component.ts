import { HttpErrorHandlerService } from './../../core/http-error-handler.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpError: HttpErrorHandlerService) {

    if (!this.authService.tokenExpirado) {
      this.router.navigate(['lancamentos']);
    }
  }

  ngOnInit() {

  }

  login(email: NgControl, senha: NgControl): void {

    this.authService.login(email.value, senha.value)
      .then(() => {
        this.router.navigate(['lancamentos']);
      }).catch(error => {
        console.log(error);
        this.httpError.handle(error);
        senha.reset();
      });
  }

}
