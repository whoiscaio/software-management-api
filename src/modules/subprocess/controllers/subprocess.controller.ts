import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { SubprocessService } from '../services/subprocess.service';
import { SubprocessDTO } from '../dtos/subprocess.dto';
import { ProcessService } from 'src/modules/process/services/process.service';

@Controller('subprocesses')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class SubprocessController {
  constructor(
    private readonly subprocessService: SubprocessService,
    private readonly processService: ProcessService,
  ) {}

  @Get()
  async findAll() {
    const subprocesss = await this.subprocessService.getAll();

    return subprocesss;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const subprocess = await this.subprocessService.getOne(id, true);

    if (!subprocess) {
      throw new NotFoundException('Subprocesso não encontrado ou não existe.');
    }

    return subprocess;
  }

  @Post()
  async create(@Body() subprocessDTO: SubprocessDTO) {
    await this.subprocessService.create(subprocessDTO);

    const associatedProcess = await this.processService.getOne(
      subprocessDTO.process_id,
      true,
    );

    await this.processService.shouldConclude(associatedProcess);

    return;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() subprocessDTO: SubprocessDTO,
  ) {
    const existingSubprocess = await this.subprocessService.getOne(id);

    if (!existingSubprocess) {
      throw new NotFoundException('Subprocesso não encontrado ou não existe.');
    }

    const updatedSubprocess = await this.subprocessService.update(
      id,
      subprocessDTO,
    );

    const associatedProcess = await this.processService.getOne(
      subprocessDTO.process_id,
      true,
    );

    await this.processService.shouldConclude(associatedProcess);

    return updatedSubprocess;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const subprocess = await this.subprocessService.getOne(id);

    if (!subprocess) {
      throw new NotFoundException('Subprocesso não encontrado ou não existe.');
    }

    await this.subprocessService.delete(id);

    return;
  }
}
