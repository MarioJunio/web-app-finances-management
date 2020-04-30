import { AcessoNegadoComponent } from './core/acesso-negado/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const router: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'lancamentos', loadChildren: './lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'pessoas', loadChildren: './pessoas/pessoas.module#PessoasModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(router)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
