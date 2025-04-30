import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PainelParaleloService } from './painelParalelo.service';
import { PainelParaleloController } from './painelParalelo.controller';

@Module({
  controllers: [PainelParaleloController],
  providers: [PainelParaleloService, PrismaService],
})
export class PainelParaleloModule {}
