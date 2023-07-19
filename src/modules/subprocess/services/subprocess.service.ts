import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subprocess } from '../models/subprocess.model';
import { SubprocessDTO } from '../dtos/subprocess.dto';
import { Process } from 'src/modules/process/models/process.model';

@Injectable()
export class SubprocessService {
  constructor(
    @InjectRepository(Subprocess)
    private readonly subprocessRepository: Repository<Subprocess>,
    @InjectRepository(Process)
    private readonly processRepository: Repository<Process>,
  ) {}

  private relations = ['process'];

  async toEntity(subprocessDTO: SubprocessDTO) {
    const process = await this.processRepository.findOne({
      where: { id: subprocessDTO.process_id },
    });

    if (!process) {
      throw new NotFoundException('Processo não encontrado ou não existe.');
    }

    const subprocess = this.subprocessRepository.create({
      ...subprocessDTO,
      process,
    });

    return subprocess;
  }

  async getAll() {
    const subprocesss = await this.subprocessRepository.find();

    return subprocesss;
  }

  async getOne(id: string, eager?: boolean) {
    const subprocess = await this.subprocessRepository.findOne({
      where: { id },
      relations: eager ? this.relations : [],
    });

    return subprocess || null;
  }

  async create(subprocess: SubprocessDTO) {
    const newSubprocess = await this.toEntity(subprocess);

    await this.subprocessRepository.save(newSubprocess);
  }

  async update(id: string, subprocess: SubprocessDTO) {
    const existingSubprocess = await this.getOne(id);

    const updatedSubprocessModel = await this.toEntity({
      ...existingSubprocess,
      ...subprocess,
    });

    const updatedSubprocess = await this.subprocessRepository.save(
      updatedSubprocessModel,
    );

    return updatedSubprocess;
  }

  async delete(id: string) {
    await this.subprocessRepository.delete(id);
  }
}
