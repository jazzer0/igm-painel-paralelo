import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PainelParaleloService {
  constructor(private prismaService: PrismaService) {}

  async getAllEstados() {
    return this.prismaService.ibge_localidades.findMany({
      distinct: ['UF_nome'],
    });
  }

  async getAllMunicipios() {
    return this.prismaService.ibge_localidades.findMany({
      select: { cod_ibge: true, nome: true, UF_nome: true, UF_sigla: true },
    });
  }

  async getMunicipiosByEstado(estado: string) {
    return this.prismaService.ibge_localidades.findMany({
      where: {
        UF_nome: estado,
      },
    });
  }

  async searchMunicipioByName(name: string) {
    return this.prismaService.ibge_localidades.findMany({
      where: {
        nome: { contains: name },
      },
      take: 10,
    });
  }

  async getMunicipioByCodIbge(codIbge: number) {
    return this.prismaService.ibge_localidades.findFirst({
      where: { cod_ibge: codIbge },
    });
  }

  async getGastoPessoalByCodIbge(codIbge: number) {
    return this.prismaService.fiscal_gasto_pessoal.findUnique({
      where: { cod_ibge: codIbge },
    });
  }

  async getLiquidezByCodIbge(codIbge: number) {
    return this.prismaService.fiscal_liquidez.findUnique({
      where: { cod_ibge: codIbge },
    });
  }

  async getCaucDataByCodIbge(codIbge: number) {
    return this.prismaService.transparencia_cauc.findUnique({
      where: { cod_ibge: codIbge },
    });
  }

  async getAllLegendaCauc() {
    return this.prismaService.legenda_cauc.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async getDataSources() {
    return this.prismaService.data_sources.findMany({
      orderBy: {
        updated_at: 'desc',
      },
    });
  }

  async getColaboradoresbyCodIbge(codIbge: number) {
    return this.prismaService.colaboradores_comissionados.findMany({
      where: { cod_ibge: codIbge },
    });
  }
}
