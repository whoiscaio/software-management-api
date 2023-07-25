import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../models/team.model';
import { TeamDTO } from '../dtos/team.dto';
import { User } from 'src/modules/auth/models/user.model';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private relations = ['users', 'workspaces'];

  async getAll() {
    const teams = await this.teamRepository.find();

    return teams;
  }

  async getOne(id: string, eager?: boolean) {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: eager ? this.relations : [],
    });

    return team || null;
  }

  async create(team: TeamDTO, userData: User) {
    const newTeam = this.teamRepository.create(team);

    const createdTeam = await this.teamRepository.save(newTeam);

    await this.assignUserToTeam(createdTeam.id, userData.id);

    return createdTeam;
  }

  async assignUserToTeam(teamId: string, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado ou não existe');
    }

    const team = await this.getOne(teamId, true);

    if (!team) {
      throw new NotFoundException('Time não encontrado ou não existe');
    }

    team.users = [...team.users, user];

    await this.teamRepository.save(team);
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
