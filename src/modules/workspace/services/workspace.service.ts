import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from '../models/workspace.model';
import { WorkspaceDTO } from '../dtos/workspace.dto';
import { Team } from 'src/modules/team/models/team.model';
import { Phase } from 'src/modules/phase/models/phase.model';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>,
  ) {}

  private relations = [
    'phases',
    'team',
    'phases.processes',
    'phases.processes.subprocesses',
  ];

  async toEntity(workspaceDTO: WorkspaceDTO) {
    const team = await this.teamRepository.findOne({
      where: { id: workspaceDTO.team_id },
    });

    if (!team) {
      throw new NotFoundException('O time não existe');
    }

    const workspace = this.workspaceRepository.create({
      ...workspaceDTO,
      team,
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

    const prototypePhase = new Phase(
      'Prototipação',
      'Fase de elaboração da feature',
      newWorkspace,
    );

    const concludedPhase = new Phase(
      'Concluídos',
      'Processos concluídos',
      newWorkspace,
    );

    await this.workspaceRepository.save(newWorkspace);
    await this.phaseRepository.save(prototypePhase);
    await this.phaseRepository.save(concludedPhase);
  }

  async update(id: string, workspace: WorkspaceDTO) {
    const existingWorkspace = await this.getOne(id);

    const updatedWorkspaceModel = await this.toEntity({
      ...existingWorkspace,
      ...workspace,
    });

    const updatedWorkspace = await this.workspaceRepository.save(
      updatedWorkspaceModel,
    );

    return updatedWorkspace;
  }

  async delete(id: string) {
    await this.workspaceRepository.delete(id);
  }
}
