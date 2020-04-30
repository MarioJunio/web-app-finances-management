import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: PessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_PESQUISAR_PESSOA']
    }
  },
  {
    path: 'nova',
    component: CadastroPessoaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA']
    }
  },
  {
    path: ':codigo',
    component: CadastroPessoaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA']
    }
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PessoasRoutingModule { }
