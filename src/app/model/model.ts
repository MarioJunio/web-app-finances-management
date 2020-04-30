export class Categoria {
  codigo: number;
  nome: string;
}

export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Pessoa {
  codigo: number;
  nome: string;
  ativo: boolean;
  endereco: Endereco = new Endereco();
}

export class Lancamento {
  codigo: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  tipoLancamento: string;
  categoria: Categoria = new Categoria();
  pessoa: Pessoa = new Pessoa();
  observacao: string;
}
