import { Module } from '@nestjs/common';
import { TeamController } from './controllers/team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './models/team.model';
import { TeamService } from './services/team.service';
import { SharedModule } from 'src/shared/shared.module';
import { User } from '../auth/models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User]), SharedModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
