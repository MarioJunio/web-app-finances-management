import { AuthService } from 'src/app/seguranca/auth.service';
import { HttpErrorHandlerService } from './../../core/http-error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgForm } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class LancamentosPesquisaComponent implements OnInit {

  public dataSource = new MatTableDataSource();
  public filtro: LancamentoFiltro;

  @ViewChild('lancamentoPesquisa')
  formPesquisa: NgForm;

  constructor(
    private router: Router,
    public authService: AuthService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private httpErrorHandler: HttpErrorHandlerService) {
  }

  ngOnInit(): void {
    this.filtro = new LancamentoFiltro();
    this.dataSource.data = [];

    // busca todos os lancamentos
    this.consultar(this.filtro.pagina);
  }

  novoLancamento(): void {
    this.router.navigate(['lancamentos/novo']);
  }

  consultar(pagina: number): void {
    this.filtro.pagina = pagina;
    this.filtro.dataVencimentoInicio = this.filtro.dataVencimentoInicio ? this.filtro.dataVencimentoInicio.format('YYYY-MM-DD') : null;
    this.filtro.dataVencimentoFim = this.filtro.dataVencimentoFim ? this.filtro.dataVencimentoFim.format('YYYY-MM-DD') : null;

    this.lancamentoService.consultar(this.filtro)
      .then(response => {
        this.dataSource.data = response ? response.content : [];
        this.filtro.quantidadeItens = response ? response.totalElements : 0;
      }).catch(e => {
        this.httpErrorHandler.handleError(e.status);
      });
  }

  public excluir(lancamento: any): void {

    this.lancamentoService.excluir(lancamento.codigo).then(response => {
      this.consultar(this.filtro.pagina);
      this.toastyService.success('Lançamento foi excluído!');
    }).catch(e => {
      this.httpErrorHandler.handleError(e.status);
    });
  }

}
