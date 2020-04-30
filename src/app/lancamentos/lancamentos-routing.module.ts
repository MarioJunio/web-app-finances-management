import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { CadastroLancamentoComponent } from './cadastro-lancamento/cadastro-lancamento.component';

import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LancamentosPesquisaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_PESQUISAR_LANCAMENTO']
    }
  },

  {
    path: 'novo',
    component: CadastroLancamentoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_LANCAMENTO']
    }
  },

  {
    path: ':codigo',
    component: CadastroLancamentoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_LANCAMENTO']
    }
  },
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class LancamentosRoutingModule { }
