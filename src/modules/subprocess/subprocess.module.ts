import { Module } from '@nestjs/common';
import { SubprocessController } from './controllers/subprocess.controller';
import { SubprocessService } from './services/subprocess.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from '../process/models/process.model';
import { Subprocess } from './models/subprocess.model';
import { SharedModule } from 'src/shared/shared.module';
import { Phase } from '../phase/models/phase.model';
import { ProcessModule } from '../process/process.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subprocess, Process, Phase]),
    SharedModule,
    ProcessModule,
  ],
  controllers: [SubprocessController],
  providers: [SubprocessService],
})
export class SubprocessModule {}
