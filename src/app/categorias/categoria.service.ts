import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private host = `${environment.apiUrl}/categorias`;

  constructor(private httpClient: HttpClient) { }

  public consultar(): Promise<any> {
    return this.httpClient.get(this.host).toPromise();
  }
}
