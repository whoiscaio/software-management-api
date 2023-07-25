import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Process } from '../models/process.model';
import { ProcessDTO } from '../dtos/process.dto';
import { Phase } from 'src/modules/phase/models/phase.model';
import { User } from 'src/modules/auth/models/user.model';

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Process)
    private readonly processRepository: Repository<Process>,
    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private relations = ['subprocesses', 'phase', 'users'];

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

  async assignUserToProcess(processId: string, userId: string) {
    const process = await this.getOne(processId, true);

    if (!process) {
      throw new NotFoundException('Processo não encontrado ou não existe.');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado ou não existe.');
    }

    process.users = [...process.users, user];

    await this.processRepository.save(process);
  }

  async update(id: string, process: ProcessDTO) {
    const existingProcess = await this.getOne(id, true);

    const updatedProcessModel = await this.toEntity({
      ...existingProcess,
      ...process,
    });

    console.log(updatedProcessModel);

    if (updatedProcessModel.concluded) {
      updatedProcessModel.subprocesses.map((subprocess) => {
        subprocess.concluded = true;
      });
    }

    const updatedProcess = await this.processRepository.save(
      updatedProcessModel,
    );

    return updatedProcess;
  }

  async shouldConclude(process: Process) {
    const areAllSubprocessesConcluded = process.subprocesses.every(
      (subprocess) => subprocess.concluded,
    );

    console.log(areAllSubprocessesConcluded);

    process.concluded = areAllSubprocessesConcluded;
    await this.processRepository.save(process);
  }

  async delete(id: string) {
    await this.processRepository.delete(id);
  }
}
