import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TeamService } from '../services/team.service';
import { TeamDTO } from '../dtos/team.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';

@Controller('teams')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll() {
    const teams = await this.teamService.getAll();

    return teams;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const team = await this.teamService.getOne(id);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team;
  }

  @Get(':id/users')
  async findUsers(@Param('id', ParseUUIDPipe) id: string) {
    const team = await this.teamService.getOne(id, true);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team.users;
  }

  @Post()
  async create(@Body() teamDTO: TeamDTO) {
    await this.teamService.create(teamDTO);

    return;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() teamDTO: TeamDTO,
  ) {
    const existingTeam = await this.teamService.getOne(id);

    if (!existingTeam) {
      throw new NotFoundException('Team not found');
    }

    const updatedTeam = await this.teamService.update(id, teamDTO);

    return updatedTeam;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const team = await this.teamService.getOne(id);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    await this.teamService.delete(id);

    return;
  }
}
