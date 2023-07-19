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
import { PhaseService } from '../services/phase.service';
import { PhaseDTO } from '../dtos/phase.dto';

@Controller('phases')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class PhaseController {
  constructor(private readonly phaseService: PhaseService) {}

  @Get()
  async findAll() {
    const phases = await this.phaseService.getAll();

    return phases;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const phase = await this.phaseService.getOne(id, true);

    if (!phase) {
      throw new NotFoundException('Fase não encontrada');
    }

    return phase;
  }

  @Post()
  async create(@Body() phaseDTO: PhaseDTO) {
    await this.phaseService.create(phaseDTO);

    return;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() phaseDTO: PhaseDTO,
  ) {
    const existingPhase = await this.phaseService.getOne(id);

    if (!existingPhase) {
      throw new NotFoundException('phase not found');
    }

    const updatedPhase = await this.phaseService.update(id, phaseDTO);

    return updatedPhase;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const phase = await this.phaseService.getOne(id);

    if (!phase) {
      throw new NotFoundException('phase not found');
    }

    await this.phaseService.delete(id);

    return;
  }
}
