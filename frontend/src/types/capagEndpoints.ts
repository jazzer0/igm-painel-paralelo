/**
 * Tipos para os endpoints da API do Painel Paralelo
 */

// Tipos baseados no modelo ibge_localidades
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

export type MunicipioSearchResult = Pick<
  Municipio,
  "cod_ibge" | "nome" | "UF_sigla" | "regiao"
>;

// Tipos para fiscal_gasto_pessoal
export interface GastoPessoal {
  cod_ibge: number;
  nome_ibge: string | null;
  despesa_com_pessoal: number | null;
  receita_corretes: number | null;
  fiscal_gasto_pessoal_bruto: number | null;
}

// Tipos para fiscal_liquidez
export interface Liquidez {
  cod_ibge: number;
  nome_ibge: string | null;
  caixa_equivalentes: number | null;
  restos_pagar: number | null;
  fiscal_liquidez_bruto: number | null;
}

// Tipos para transparencia_cauc
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

// Tipos para legenda_cauc
export interface LegendaCauc {
  id: number;
  codigo_item: string;
  exigencia: string;
}

// Tipos para data_sources
export interface DataSource {
  file_base: string;
  file_name: string | null;
  link: string | null;
  file_type: string | null;
  updated_at: Date;
  last_checked: Date;
}

// Tipos para colaboradores_comissionados
export interface Colaborador {
  cod_ibge: number;
  Municipio: string | null;
  UF: string | null;
  populacao: number | null;
  servidores: number | null;
  comissionados: number | null;
  colaboradores_comissionados_bruto: number | null;
}

/**
 * Tipos para as respostas da API
 */
export interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

// Tipos específicos para cada endpoint
export type MunicipioSearchResponse = APIResponse<MunicipioSearchResult[]>;
export type MunicipioResponse = APIResponse<Municipio>;
export type GastoPessoalResponse = APIResponse<GastoPessoal>;
export type LiquidezResponse = APIResponse<Liquidez>;
export type CaucDataResponse = APIResponse<CaucData>;
export type LegendaCaucResponse = APIResponse<LegendaCauc[]>;
export type DataSourcesResponse = APIResponse<DataSource[]>;
export type ColaboradoresResponse = APIResponse<Colaborador[]>;

/**
 * Tipos para parâmetros das queries
 */
export interface MunicipioSearchParams {
  name: string;
}

export interface CodIbgeParams {
  codIbge: number;
}

/**
 * Tipo para erros da API
 */
export interface APIError {
  statusCode: number;
  message: string;
  error?: string;
  timestamp: string;
}
