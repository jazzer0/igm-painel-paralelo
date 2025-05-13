// ibge_localidades
export interface Municipio {
  id: number;
  cod_ibge: number;
  nome: string | null;
  microrregiao: string | null;
  mesorregiao: string | null;
  UF_sigla: string | null;
  UF_nome: string | null;
  regiao: string | null;
  regiao_imediata_id: number | null;
  regiao_imediata: string | null;
}

export interface MunicipioBasic {
  cod_ibge: number;
  nome: string | null;
  UF_sigla: string | null;
  UF_nome: string | null;
}

// fiscal_gasto_pessoal
export interface GastoPessoal {
  cod_ibge: number;
  nome_ibge: string | null;
  despesa_com_pessoal: number | null;
  receita_corrente_liquida: number | null;
  fiscal_gasto_pessoal_bruto: number | null;
}

// fiscal_liquidez
export interface Liquidez {
  cod_ibge: number;
  nome_ibge: string | null;
  caixa_equivalentes: number | null;
  restos_pagar: number | null;
  fiscal_liquidez_bruto: number | null;
}

// transparencia_cauc
export interface CaucData {
  cod_ibge: number;
  nome_ibge: string | null;
  nome_igm: string | null;
  uf: string | null;
  nome_mesclado: string | null;
  transparencia_cauc_bruto: number | null;
  pendencias: number;
  pendencias_legenda: string | null;
  pendencias_legenda_individual: string | null;
}

// legenda_cauc
export interface LegendaCauc {
  id: number;
  codigo_item: string;
  exigencia: string;
}

// data_sources
export interface DataSource {
  file_base: string;
  file_name: string | null;
  link: string | null;
  file_type: string | null;
  updated_at: Date;
  last_checked: Date;
}

// colaboradores_comissionados
export interface Colaborador {
  cod_ibge: number;
  Municipio: string | null;
  UF: string | null;
  populacao: number | null;
  servidores: number | null;
  comissionados: number | null;
  colaboradores_comissionados_bruto: number | null;
}

// response typesjuli
export interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

// params
export type MunicipioSearchResponse = APIResponse<MunicipioBasic[]>;
export type MunicipioResponse = Municipio
export type GastoPessoalResponse = GastoPessoal
export type LiquidezResponse = Liquidez
export type CaucDataResponse = CaucData
export type LegendaCaucResponse = LegendaCauc
export type DataSourcesResponse = DataSource
export type ColaboradoresResponse = Colaborador