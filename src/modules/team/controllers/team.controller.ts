import { Controller, Get } from '@nestjs/common';
import { TeamService } from '../services/team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll() {
    const teams = this.teamService.getTeams();

    return teams;
  }
}
