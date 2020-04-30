import { AuthService } from 'src/app/seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material';

import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent implements OnInit {

  @Output() paginaAlterada = new EventEmitter();
  @Output() lancamentoExcluido = new EventEmitter();

  @Input() public columns: string[];

  @Input() dataSource = new MatTableDataSource();

  @Input() quantidadeItens: number = 0;

  @Input() pagina: number = 0;

  @Input() tamanhoPagina: number = 0;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private titie: Title) {

  }

  ngOnInit(): void {
    this.titie.setTitle('Pesquisa de lançamentos');
  }

  public alterarPagina($event): void {
    this.paginaAlterada.emit($event.pageIndex);
  }

  public excluirConfirmacao(lancamento: any): void {

    this.dialog.open(ConfirmDialogComponent, {

      data: {
        message: 'Tem certeza que deseja excluir esse lançamento?',
        yes: () => {
          this.excluir(lancamento);
        },
        no: () => {
          console.log('nothing to do');
        }
      }
    });
  }

  excluir(lancamento: any): void {
    this.lancamentoExcluido.emit(lancamento);
  }

}
