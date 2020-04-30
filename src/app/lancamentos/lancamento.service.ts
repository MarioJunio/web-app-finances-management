import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lancamento } from '../model/model';
import { environment } from 'src/environments/environment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: any;
  dataVencimentoFim: any;
  pagina = 0;
  tamanhoPagina = 2;
  quantidadeItens = 0;
}

@Injectable()
export class LancamentoService {

  private host = `${environment.apiUrl}/lancamentos`;

  constructor(private httpClient: HttpClient) { }

  public salvar(lancamento: Lancamento): Promise<any> {
    return this.httpClient.post(this.host, lancamento).toPromise();
  }

  public consultar(filtro: LancamentoFiltro): Promise<any> {
    const params: any = {};

    // paginacao
    params.page = filtro.pagina;
    params.size = filtro.tamanhoPagina;

    if (filtro.descricao) {
      params.descricao = filtro.descricao;
    }

    if (filtro.dataVencimentoInicio) {
      params.dataVencimentoDe = filtro.dataVencimentoInicio;
    }

    if (filtro.dataVencimentoFim) {
      params.dataVencimentoAte = filtro.dataVencimentoFim;
    }

    return this.httpClient.get(this.host, { params }).toPromise();
  }

  public excluir(codigo: number): Promise<any> {
    return this.httpClient.delete(`${this.host}/${codigo}`).toPromise();
  }

  public buscarPorCodigo(codigo: number): Promise<any> {
    return this.httpClient.get(`${this.host}/${codigo}`).toPromise();
  }

  public atualizar(lancamento: Lancamento): Promise<any> {
    return this.httpClient.put(`${this.host}/${lancamento.codigo}`, lancamento).toPromise();
  }

}
