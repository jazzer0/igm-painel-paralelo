import { Controller } from '@nestjs/common';
import { PainelParaleloService } from './painelParalelo.service';

@Controller('painel-paralelo')
export class PainelParaleloController {
  constructor(private readonly painelParaleloService: PainelParaleloService) {}
}
