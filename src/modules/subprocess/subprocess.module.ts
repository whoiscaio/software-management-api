import { Module } from '@nestjs/common';
import { SubprocessController } from './controllers/subprocess.controller';
import { SubprocessService } from './services/subprocess.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from '../process/models/process.model';
import { Subprocess } from './models/subprocess.model';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subprocess, Process]), SharedModule],
  controllers: [SubprocessController],
  providers: [SubprocessService],
})
export class SubprocessModule {}
