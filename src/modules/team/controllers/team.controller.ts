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
    const team = await this.teamService.getOne(id, true);

    if (!team) {
      throw new NotFoundException('Time não encontrado ou não existe.');
    }

    return team;
  }

  @Post()
  async create(@Body() teamDTO: TeamDTO) {
    await this.teamService.create(teamDTO);

    return;
  }

  @Post(':teamId/users/:userId')
  async assignUserToTeam(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    await this.teamService.assignUserToTeam(teamId, userId);

    return;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() teamDTO: TeamDTO,
  ) {
    const existingTeam = await this.teamService.getOne(id);

    if (!existingTeam) {
      throw new NotFoundException('Time não encontrado ou não existe.');
    }

    const updatedTeam = await this.teamService.update(id, teamDTO);

    return updatedTeam;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const team = await this.teamService.getOne(id);

    if (!team) {
      throw new NotFoundException('Time não encontrado ou não existe.');
    }

    await this.teamService.delete(id);

    return;
  }
}
