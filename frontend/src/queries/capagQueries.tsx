import axios from 'axios';
import {
  MunicipioResponse,
  GastoPessoalResponse,
  LiquidezResponse,
  CaucDataResponse,
  LegendaCaucResponse,
  DataSourcesResponse,
  ColaboradoresResponse,
  MunicipioSearchResponse,
} from '../types/capagEndpoints';

const API_URL = import.meta.env.VITE_CAPAG_API_URL;

export const getAllMunicipios = async (): Promise<MunicipioSearchResponse> => {
  const response = await axios.get(`${API_URL}/municipios/all`);
  return response.data;
};

export const getMunicipioByCodIbge = async (codIbge: number): Promise<MunicipioResponse> => {
  const response = await axios.get(`${API_URL}/municipios/${codIbge}`);
  return response.data;
};

export const getLiquidezByCodIbge = async (codIbge: number): Promise<LiquidezResponse> => {
  const response = await axios.get(`${API_URL}/municipios/${codIbge}/liquidez`);
  return response.data;
};

export const getGastoPessoalByCodIbge = async (codIbge: number): Promise<GastoPessoalResponse> => {
  const response = await axios.get(`${API_URL}/municipios/${codIbge}/gasto-pessoal`);
  return response.data;
};

export const getCaucDataByCodIbge = async (codIbge: number): Promise<CaucDataResponse> => {
  const response = await axios.get(`${API_URL}/municipios/${codIbge}/cauc`);
  return response.data;
};

export const getAllLegendaCauc = async (): Promise<LegendaCaucResponse> => {
  const response = await axios.get(`${API_URL}/legendas-cauc`);
  return response.data;
};

export const getDataSources = async (): Promise<DataSourcesResponse> => {
  const response = await axios.get(`${API_URL}/fontes-dados`);
  return response.data;
};

export const getColaboradoresByCodIbge = async (codIbge: number): Promise<ColaboradoresResponse> => {
  const response = await axios.get(`${API_URL}/municipios/${codIbge}/colaboradores`);
  return response.data;
};

export const searchMunicipioByName = async (name: string): Promise<MunicipioResponse> => {
  const response = await axios.get(`${API_URL}/municipios/search`, { params: { nome: name } });
  return response.data;
};