import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from '../models/workspace.model';
import { WorkspaceDTO } from '../dtos/workspace.dto';
import { Team } from 'src/modules/team/models/team.model';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  private relations = ['phases', 'team'];

  async toEntity(workspaceDTO: WorkspaceDTO) {
    const workspaceTeam = await this.teamRepository.findOne({
      where: { id: workspaceDTO.team_id },
    });

    if (!workspaceTeam) {
      throw new NotFoundException('O time não existe');
    }

    const workspace = this.workspaceRepository.create({
      ...workspaceDTO,
      team: workspaceTeam,
    });

    return workspace;
  }

  async getAll() {
    const workspaces = await this.workspaceRepository.find();

    return workspaces;
  }

  async getOne(id: string, eager?: boolean) {
    const workspace = await this.workspaceRepository.findOne({
      where: { id },
      relations: eager ? this.relations : [],
    });

    return workspace || null;
  }

  async create(workspace: WorkspaceDTO) {
    const newWorkspace = await this.toEntity(workspace);

    await this.workspaceRepository.save(newWorkspace);
  }

  async update(id: string, workspace: WorkspaceDTO) {
    const existingworkspace = await this.getOne(id);

    const updatedWorkspaceModel = await this.toEntity({
      ...existingworkspace,
      ...workspace,
    });

    const updatedworkspace = await this.workspaceRepository.save(
      updatedWorkspaceModel,
    );

    return updatedworkspace;
  }

  async delete(id: string) {
    await this.workspaceRepository.delete(id);
  }
}
