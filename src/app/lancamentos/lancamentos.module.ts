import { ConfirmDialogComponent } from './../shared/confirm-dialog/confirm-dialog.component';
import { LancamentoService } from './lancamento.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LancamentosRoutingModule } from './lancamentos-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxMaskModule } from 'ngx-mask';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

import { CadastroLancamentoComponent } from './cadastro-lancamento/cadastro-lancamento.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';

export const options: any | (() => Partial<any>) = null;

@NgModule({
  declarations: [
    CadastroLancamentoComponent,
    LancamentosPesquisaComponent,
    LancamentosGridComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot(options),
    MatChipsModule,
    MatCardModule,
    SharedModule,
    LancamentosRoutingModule
  ],
  providers: [LancamentoService],
  exports: [CadastroLancamentoComponent, LancamentosPesquisaComponent]
})

export class LancamentosModule { }
