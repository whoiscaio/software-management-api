import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Process } from '../models/process.model';
import { ProcessDTO } from '../dtos/process.dto';
import { Phase } from 'src/modules/phase/models/phase.model';

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Process)
    private readonly processRepository: Repository<Process>,
    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>,
  ) {}

  private relations = ['subprocesses', 'phase'];

  async toEntity(processDTO: ProcessDTO) {
    const phase = await this.phaseRepository.findOne({
      where: { id: processDTO.phase_id },
    });

    if (!phase) {
      throw new NotFoundException('Fase não encontrada ou não existe.');
    }

    const process = this.processRepository.create({
      ...processDTO,
      phase,
    });

    return process;
  }

  async getAll() {
    const processs = await this.processRepository.find();

    return processs;
  }

  async getOne(id: string, eager?: boolean) {
    const process = await this.processRepository.findOne({
      where: { id },
      relations: eager ? this.relations : [],
    });

    return process || null;
  }

  async create(process: ProcessDTO) {
    const newProcess = await this.toEntity(process);

    await this.processRepository.save(newProcess);
  }

  async update(id: string, process: ProcessDTO) {
    const existingProcess = await this.getOne(id);

    const updatedProcessModel = await this.toEntity({
      ...existingProcess,
      ...process,
    });

    const updatedProcess = await this.processRepository.save(
      updatedProcessModel,
    );

    return updatedProcess;
  }

  async delete(id: string) {
    await this.processRepository.delete(id);
  }
}
