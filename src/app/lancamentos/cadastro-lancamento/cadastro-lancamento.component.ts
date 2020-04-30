import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../model/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { HttpErrorHandlerService } from './../../core/http-error-handler.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';

@Component({
  selector: 'app-cadastro-lancamento',
  templateUrl: './cadastro-lancamento.component.html',
  styleUrls: ['./cadastro-lancamento.component.css']
})
export class CadastroLancamentoComponent implements OnInit {

  pessoasFormControl = new FormControl();
  pessoasFiltered: Observable<any[]>;

  lancamento: Lancamento = new Lancamento();
  lancamentoForm: FormGroup;

  categorias = [];
  pessoas = [];

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoaService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private httpErrorHandler: HttpErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.criarFormulario();

    // atribui o codigo do lancamento, passado como parametro na URL para edicao
    this.lancamentoForm.get('codigo').setValue(this.activatedRoute.snapshot.params.codigo);

    // verifica se o codigo está preenchido, se estiver então é uma edição
    if (this.isEdicao) {
      this.buscar();
    }

    this.consultarCategorias();
    this.consultarPessoas();

    this.pessoasFiltered = this.pessoasFormControl.valueChanges.pipe(startWith(''), map(pessoa => this._filter(pessoa)));
  }

  private criarFormulario(): void {

    // instancia formulario reativo
    this.lancamentoForm = this.formBuilder.group({
      codigo: [null],
      descricao: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      dataPagamento: ['', Validators.required],
      valor: [null, Validators.required],
      tipoLancamento: [null, Validators.required],
      categoria: this.formBuilder.group({
        codigo: [null],
        nome: ['']
      }),
      pessoa: this.formBuilder.group({
        codigo: [null],
        nome: ['']
      }),
      observacao: ['']
    });
  }

  private tituloPagina(): void {

    this.title.setTitle(this.isEdicao
      ? ('Editando ' + this.lancamentoForm.get('descricao').value)
      : 'Novo lançamento');
  }

  private buscar(): void {

    this.lancamentoService
      .buscarPorCodigo(this.lancamentoForm.get('codigo').value)
      .then(lancamento => {
        this.lancamentoForm.patchValue(lancamento);
        this.tituloPagina();
      }).catch(e => {
        console.log(e);
        this.httpErrorHandler.getMessageByStatusCode(e.status);
      });
  }

  public persistir() {

    if (this.isEdicao) {
      this.atualizar();
    } else {
      this.salvar();
    }

  }

  public salvar() {

    this.lancamentoService
      .salvar(this.lancamentoForm.value)
      .then(lancamento => {
        this.toastyService.success('Lançamento foi cadastrado com sucesso!');
        this.router.navigate(['/lancamentos', lancamento.codigo]);
      }).catch(e => {
        this.httpErrorHandler.getMessageByStatusCode(e.status);
      });
  }

  public atualizar() {
    this.lancamentoService
      .atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamentoForm.setValue(lancamento);
        this.tituloPagina();

        this.toastyService.success('Lançamento foi atualizado com sucesso!');
      }).catch(e => {
        this.httpErrorHandler.getMessageByStatusCode(e.status);
      });
  }

  public novo() {

    setTimeout(() => {
      this.lancamentoForm.reset();
    }, 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  private consultarCategorias(): void {
    this.categoriaService.consultar()
      .then(categorias => {
        this.categorias = categorias;
      }).catch(e => {
        this.httpErrorHandler.getMessageByStatusCode(e.status);
      });
  }

  private consultarPessoas(): void {
    this.pessoasService.consultarTodos()
      .then(response => {
        this.pessoas = response.map(pessoa => ({ codigo: pessoa.codigo, nome: pessoa.nome }));
      }).catch(e => {
        console.log(this.httpErrorHandler.getMessageByStatusCode(e.status));
      });
  }

  public selecionarPessoa(pessoa) {
    this.lancamentoForm.get('pessoa').setValue({ codigo: pessoa.codigo, nome: pessoa.nome });
  }

  public get isEdicao() {
    return this.lancamentoForm.get('codigo').value != null;
  }

  private _filter(nome: string): any[] {

    if (nome && nome.length > 0) {
      return this.pessoas.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));
    } else {
      return [];
    }
  }

  public verificarPessoa() {
    const pessoas: any[] = this._filter(this.pessoasFormControl.value);
    const pessoaFormControl = this.lancamentoForm.get('pessoa');

    if (pessoas.length === 0) {
      pessoaFormControl.setValue({ codigo: null, nome: null });
    } else {
      pessoaFormControl.setValue({ codigo: pessoas[0].codigo, nome: pessoas[0].nome });
    }
  }

}
