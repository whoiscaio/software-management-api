import { Module } from '@nestjs/common';
import { ProcessController } from './controllers/process.controller';
import { ProcessService } from './services/process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from './models/process.model';
import { Phase } from '../phase/models/phase.model';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Process, Phase]), SharedModule],
  controllers: [ProcessController],
  providers: [ProcessService],
})
export class ProcessModule {}
