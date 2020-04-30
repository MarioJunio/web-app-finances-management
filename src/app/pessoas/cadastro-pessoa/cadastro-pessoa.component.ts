import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorHandlerService } from './../../core/http-error-handler.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/model/model';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {

  estados: string[] = ['GO', 'MG', 'BA', 'RJ'];
  // tslint:disable-next-line: max-line-length
  cidades: any[] = [{ nome: 'Goiania', uf: 'GO' }, { nome: 'Uberlândia', uf: 'MG' }, { nome: 'Salvador', uf: 'BA' }, { nome: 'Rio de Janeiro', uf: 'RJ' }];

  cidadesEstado: string[] = [];

  pessoa: Pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private httpErrorHandlerService: HttpErrorHandlerService,
    private toastyService: ToastyService,
    private activedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.pessoa.codigo = this.activedRoute.snapshot.params.codigo;

    // se for edicao busca a pessoa a ser editada
    if (this.isEdicao) {
      this.buscar();
    }
  }

  buscar(): void {
    this.pessoaService.buscar(this.pessoa.codigo)
      .then(pessoa => {
        this.buscarCidades(pessoa.endereco.estado);
        this.pessoa = pessoa;
      })
      .catch(error => this.toastyService.error(this.httpErrorHandlerService.getMessageByStatusCode(error.status)));
  }

  public salvar(formControl: FormControl): void {
    this.pessoa.ativo = true;
    this.pessoaService.salvar(this.pessoa)
      .then(pessoa => {
        const message: string = this.isEdicao ? 'alterada' : 'cadastrada';

        this.toastyService.success(`Pessoa ${message} com sucesso`);
        this.router.navigate(['pessoas', pessoa.codigo]);
      }).catch(e => {
        this.httpErrorHandlerService.getMessageByStatusCode(e.status);
      });
  }

  public estadoSelecionado(event): void {
    this.buscarCidades(event.value);
  }

  buscarCidades(uf: string): void {
    this.cidadesEstado = this.cidades.filter(cidade => cidade.uf === uf);
  }

  public limpar(formControl: FormControl): void {
    this.pessoa = new Pessoa();
    formControl.reset();
  }

  public get isEdicao(): boolean {
    return !!this.pessoa.codigo;
  }
}
