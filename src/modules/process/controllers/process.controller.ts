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
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { ProcessService } from '../services/process.service';
import { ProcessDTO } from '../dtos/process.dto';

@Controller('processes')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Get()
  async findAll() {
    const processs = await this.processService.getAll();

    return processs;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const process = await this.processService.getOne(id, true);

    if (!process) {
      throw new NotFoundException('Processo não encontrado ou não existe.');
    }

    return process;
  }

  @Post()
  async create(@Body() processDTO: ProcessDTO) {
    await this.processService.create(processDTO);

    return;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() processDTO: ProcessDTO,
  ) {
    const existingProcess = await this.processService.getOne(id);

    if (!existingProcess) {
      throw new NotFoundException('Processo não encontrado ou não existe.');
    }

    const updatedProcess = await this.processService.update(id, processDTO);

    return updatedProcess;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const process = await this.processService.getOne(id);

    if (!process) {
      throw new NotFoundException('Processo não encontrado ou não existe.');
    }

    await this.processService.delete(id);

    return;
  }
}
