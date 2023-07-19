import { Module } from '@nestjs/common';
import { ProcessController } from './controllers/process.controller';
import { ProcessService } from './services/process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from './models/process.model';
import { Phase } from '../phase/models/phase.model';
import { SharedModule } from 'src/shared/shared.module';
import { User } from '../auth/models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Process, Phase, User]), SharedModule],
  controllers: [ProcessController],
  providers: [ProcessService],
})
export class ProcessModule {}
