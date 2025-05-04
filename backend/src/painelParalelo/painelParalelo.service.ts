import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PainelParaleloService {
  constructor(private prismaService: PrismaService) {}

  async searchMunicipioByName(name: string) {
    return this.prismaService.ibge_localidades.findMany({
      where: {
        nome: { contains: name },
      },
      take: 10,
    });
  }

  async getMunicipioByCodIbge(codIbge: number) {
    return this.prismaService.ibge_localidades.findUnique({
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
}
