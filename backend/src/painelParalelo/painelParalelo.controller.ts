import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { PainelParaleloService } from './painelParalelo.service';

@Controller('painel-paralelo')
export class PainelParaleloController {
  constructor(private readonly painelParaleloService: PainelParaleloService) {}

  @Get('municipios/all')
  async getAllMunicipios() {
    const municipios = await this.painelParaleloService.getAllMunicipios();
    if (!municipios || municipios.length === 0) {
      throw new NotFoundException('Erro ao buscar municípios');
    }
    return municipios;
  }

  @Get('municipios/search')
  async searchMunicipioByName(@Query('nome') nome: string) {
    const municipio =
      await this.painelParaleloService.searchMunicipioByName(nome);
    if (!municipio) {
      throw new NotFoundException(`Município com nome ${nome} não encontrado`);
    }
    return municipio;
  }
  @Get('municipios/:codIbge')
  async getMunicipioByCodIbge(@Param('codIbge') codIbge: string) {
    const municipio = await this.painelParaleloService.getMunicipioByCodIbge(
      parseInt(codIbge),
    );
    if (!municipio) {
      throw new NotFoundException(
        `Município com código IBGE ${codIbge} não encontrado`,
      );
    }
    return municipio;
  }

  @Get('municipios/:codIbge/gasto-pessoal')
  async getGastoPessoalByCodIbge(@Param('codIbge') codIbge: string) {
    const cod_ibge = parseInt(codIbge, 10);
    const gasto =
      await this.painelParaleloService.getGastoPessoalByCodIbge(cod_ibge);
    if (!gasto) {
      throw new NotFoundException(
        `Gasto pessoal para o código IBGE ${codIbge} não encontrado`,
      );
    }
    return gasto;
  }

  @Get('municipios/:codIbge/liquidez')
  async getLiquidezByCodIbge(@Param('codIbge') codIbge: string) {
    const liquidez = await this.painelParaleloService.getLiquidezByCodIbge(
      parseInt(codIbge),
    );
    if (!liquidez) {
      throw new NotFoundException(
        `Liquidez para o código IBGE ${codIbge} não encontrada`,
      );
    }
    return liquidez;
  }

  @Get('municipios/:codIbge/cauc')
  async getCaucDataByCodIbge(@Param('codIbge') codIbge: string) {
    const cauc = await this.painelParaleloService.getCaucDataByCodIbge(
      parseInt(codIbge),
    );
    if (!cauc) {
      throw new NotFoundException(
        `Dados CAUC para o código IBGE ${codIbge} não encontrados`,
      );
    }
    return cauc;
  }

  @Get('legendas-cauc')
  async getAllLegendaCauc() {
    const legendas = await this.painelParaleloService.getAllLegendaCauc();
    if (!legendas || legendas.length === 0) {
      throw new NotFoundException('Legendas CAUC não encontradas');
    }
    return legendas;
  }

  @Get('data-sources')
  async getDataSources() {
    const fontes = await this.painelParaleloService.getDataSources();
    if (!fontes || fontes.length === 0) {
      throw new NotFoundException('Fontes de dados não encontradas');
    }
    return fontes;
  }

  @Get('municipios/:codIbge/colaboradores')
  async getColaboradoresbyCodIbge(@Param('codIbge') codIbge: string) {
    const colaboradores =
      await this.painelParaleloService.getColaboradoresbyCodIbge(
        parseInt(codIbge),
      );
    if (!colaboradores) {
      throw new NotFoundException(
        `Colaboradores para o código IBGE ${codIbge} não encontrados`,
      );
    }
    return colaboradores;
  }
}
