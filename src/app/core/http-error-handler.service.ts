import { AuthService } from './../seguranca/auth.service';
import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private authService: AuthService,
    private router: Router) { }

  handle(error: any) {

    if (typeof error === 'string') {
      this.toasty.error(error);
    } else if (error.error.error === 'invalid_token') {
      this.authService.apagarToken();
      this.router.navigate(['login']);
    } else {
      this.toasty.error(this.getMessageByStatusCode(error.status));
    }

  }

  handleError(status: number): void {
    this.toasty.error(this.getMessageByStatusCode(status));
  }

  getMessageByStatusCode(status: number): string {
    let message = '';

    switch (status) {

      case 400:
        message = 'Não foi possível tratar a requisição.';
        break;

      case 401:
        message = 'É necessário se autenticar para acessar esse recurso.';
        break;

      case 403:
        message = 'Você não possui autorização para acessar esse recurso.';
        break;

      case 404:
        message = 'Não foi possível localizar o recurso solicitado.';
        break;

      case 405:
        message = 'Método solicitado não existe.';
        break;

      case 408:
        message = 'O servidor não está respondendo no momento.';
        break;

      case 500:
        message = 'Algo aconteceu de errado. Tente novamente mais tarde';
        break;

      case 502:
        message = 'Não foi possível processar os dados do gateway corretamente.';
        break;

      default:
        message = 'O serviço remoto está com problemas. Tente novamente mais tarde';

    }

    return message;
  }

  getMessageByError(error: string): string {
    let message = '';

    if (error.startsWith('SQLIntegrityConstraintViolationException')) {
      message = 'já está vinculado(a) há outro registro.';
    }

    return message;
  }
}
