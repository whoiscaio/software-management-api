import { Module } from '@nestjs/common';
import { TeamController } from './controllers/team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './models/team.model';
import { TeamService } from './services/team.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), SharedModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
