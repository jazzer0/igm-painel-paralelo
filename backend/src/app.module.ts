import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PainelParaleloModule } from './painelParalelo/painelParalelo.module';

@Module({
  imports: [PainelParaleloModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
