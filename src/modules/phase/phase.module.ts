import { Module } from '@nestjs/common';
import { PhaseController } from './controllers/phase.controller';
import { PhaseService } from './services/phase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phase } from './models/phase.model';
import { Workspace } from '../workspace/models/workspace.model';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Phase, Workspace]), SharedModule],
  controllers: [PhaseController],
  providers: [PhaseService],
})
export class PhaseModule {}
