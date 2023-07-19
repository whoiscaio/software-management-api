import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phase } from '../models/phase.model';
import { PhaseDTO } from '../dtos/phase.dto';
import { Workspace } from 'src/modules/workspace/models/workspace.model';

@Injectable()
export class PhaseService {
  constructor(
    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  private relations = ['processes', 'workspace'];

  async toEntity(phaseDTO: PhaseDTO) {
    const phaseWorkspace = await this.workspaceRepository.findOne({
      where: { id: phaseDTO.workspace_id },
    });

    if (!phaseWorkspace) {
      throw new NotFoundException('A área de trabalho não existe');
    }

    const phase = this.phaseRepository.create({
      ...phaseDTO,
      workspace: phaseWorkspace,
    });

    return phase;
  }

  async getAll() {
    const phases = await this.phaseRepository.find();

    return phases;
  }

  async getOne(id: string, eager?: boolean) {
    const phase = await this.phaseRepository.findOne({
      where: { id },
      relations: eager ? this.relations : [],
    });

    return phase || null;
  }

  async create(phase: PhaseDTO) {
    const newPhase = await this.toEntity(phase);

    await this.phaseRepository.save(newPhase);
  }

  async update(id: string, phase: PhaseDTO) {
    const existingPhase = await this.getOne(id);

    const updatedPhaseModel = await this.toEntity({
      ...existingPhase,
      ...phase,
    });

    const updatedPhase = await this.phaseRepository.save(updatedPhaseModel);

    return updatedPhase;
  }

  async delete(id: string) {
    await this.phaseRepository.delete(id);
  }
}
