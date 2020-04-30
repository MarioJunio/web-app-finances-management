import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../model/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private host = `${environment.apiUrl}/pessoas`;

  constructor(private http: HttpClient) { }

  public buscar(codigo: number): Promise<any> {
    return this.http.get(`${this.host}/${codigo}`).toPromise();
  }

  public salvar(pessoa: Pessoa): Promise<any> {
    return this.http.post(this.host, pessoa).toPromise();
  }

  public consultarTodos(): Promise<any> {
    return this.http.get(`${this.host}/todos?ativo=true`).toPromise();
  }

  public consultar(filtro: PessoaFiltro): Promise<any> {
    let params: any = { page: filtro.pagina, size: filtro.tamanhoPagina };

    if (filtro.nome) {
      params.nome = filtro.nome;
    }

    return this.http.get(this.host, { params }).toPromise();
  }

  public excluir(pessoa: any): Promise<any> {
    return this.http.delete(`${this.host}/${pessoa.codigo}`).toPromise();
  }

  public ativar(pessoa: any): Promise<any> {
    return this.http.get(`${this.host}/ativar/${pessoa.codigo}`).toPromise();
  }
}

export class PessoaFiltro {
  nome: string;
  pagina: number = 0;
  tamanhoPagina: number = 2;
  totalItens: number = 0;
}
