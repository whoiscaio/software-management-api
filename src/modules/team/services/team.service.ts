import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../models/team.model';
import { TeamDTO } from '../dtos/team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async getAll() {
    const teams = await this.teamRepository.find();

    return teams;
  }

  async getOne(id: string) {
    const team = await this.teamRepository.findOne({ where: { id } });

    return team || null;
  }

  async create(team: TeamDTO) {
    const newTeam = this.teamRepository.create(team);

    await this.teamRepository.save(newTeam);
  }

  async update(id: string, team: TeamDTO) {
    const existingTeam = await this.getOne(id);

    const updatedTeamModel = this.teamRepository.create({
      ...existingTeam,
      ...team,
    });

    const updatedTeam = await this.teamRepository.save(updatedTeamModel);

    return updatedTeam;
  }

  async delete(id: string) {
    await this.teamRepository.delete(id);
  }
}
