import { Module } from '@nestjs/common';
import { WorkspaceController } from './controllers/workspace.controller';
import { WorkspaceService } from './services/workspace.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './models/workspace.model';
import { SharedModule } from 'src/shared/shared.module';
import { Team } from '../team/models/team.model';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, Team]), SharedModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
