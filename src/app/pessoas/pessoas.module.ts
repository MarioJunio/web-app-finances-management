import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { SharedModule } from './../shared/shared.module';

import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoaService } from './pessoa.service';

@NgModule({
  declarations: [CadastroPessoaComponent, PessoasPesquisaComponent, PessoasGridComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCardModule,
    SharedModule,
    PessoasRoutingModule
  ],
  providers: [PessoaService],
  exports: [CadastroPessoaComponent, PessoasPesquisaComponent]
})

export class PessoasModule { }
