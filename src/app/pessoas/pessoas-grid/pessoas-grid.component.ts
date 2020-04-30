import { AuthService } from 'src/app/seguranca/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material';

import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent implements OnInit {

  @Input() dataSource = new MatTableDataSource();
  @Input() columns: string[];

  @Input() totalItens: number;
  @Input() tamanhoPagina: number;

  @Output() statusAlterado = new EventEmitter();
  @Output() pessoaExcluida = new EventEmitter();
  @Output() editarPessoa = new EventEmitter();
  @Output() paginaAlterada = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.dataSource = this.dataSource;
  }

  alterarPagina($event): void {
    this.paginaAlterada.emit($event.pageIndex);
  }

  excluirConfirmacao(pessoa: any): void {

    this.dialog.open(ConfirmDialogComponent, {

      data: {
        message: 'Tem certeza que deseja excluir essa pessoa?',
        yes: () => {
          this.excluir(pessoa);
        },
        no: () => {
          console.log('nothing to do');
        }
      }
    });

  }

  editar(pessoa: any): void {
    this.editarPessoa.emit(pessoa);
  }

  excluir(pessoa: any): void {
    this.pessoaExcluida.emit(pessoa);
  }

  alterarStatus(pessoa: any): void {
    this.statusAlterado.emit(pessoa);
  }
}
