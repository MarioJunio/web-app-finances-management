import { ToastyService } from 'ng2-toasty';
import { HttpErrorHandlerService } from './../../core/http-error-handler.service';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  dataSource = new MatTableDataSource();

  filtro = new PessoaFiltro();

  constructor(
    public authService: AuthService,
    private pessoaService: PessoaService,
    private httpErrorHandler: HttpErrorHandlerService,
    private toastyService: ToastyService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.consultar(this.filtro.pagina);
  }

  consultar(pagina: number): void {
    this.filtro.pagina = pagina;

    this.pessoaService.consultar(this.filtro)
      .then(response => {
        let hasResponse = response ? true : false;

        this.dataSource.data = hasResponse ? response.content : [];
        this.filtro.totalItens = hasResponse ? response.totalElements : 0;
      }).catch(e => {
        this.httpErrorHandler.handleError(e.status);
      });
  }

  editar(pessoa: any): void {
    this.router.navigate(['pessoas', pessoa.codigo]);
  }

  excluir(pessoa: any): void {
    this.pessoaService.excluir(pessoa).then(() => {
      this.consultar(this.filtro.pagina);
      this.toastyService.success('Pessoa foi excluída!');
    }).catch((e) => {
      let message = 'Pessoa ' + this.httpErrorHandler.getMessageByError(e.error[0].mensagemDesenvolvedor);
      this.toastyService.error(message);
    });
  }

  alterarStatus(pessoa: any): void {
    this.pessoaService.ativar(pessoa).then(() => {
      this.consultar(this.filtro.pagina);
    }).catch((e) => {
      this.httpErrorHandler.handleError(e.status);
    });
  }
}
