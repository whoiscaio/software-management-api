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
import { WorkspaceService } from '../services/workspace.service';
import { WorkspaceDTO } from '../dtos/workspace.dto';

@Controller('workspaces')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  async findAll() {
    const workspaces = await this.workspaceService.getAll();

    return workspaces;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const workspace = await this.workspaceService.getOne(id, true);

    if (!workspace) {
      throw new NotFoundException(
        'Área de trabalho não encontrada ou não existe.',
      );
    }

    return workspace;
  }

  @Post()
  async create(@Body() workspaceDTO: WorkspaceDTO) {
    const newWorkspace = await this.workspaceService.create(workspaceDTO);

    return newWorkspace;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() workspaceDTO: WorkspaceDTO,
  ) {
    const existingWorkspace = await this.workspaceService.getOne(id);

    if (!existingWorkspace) {
      throw new NotFoundException(
        'Área de trabalho não encontrada ou não existe.',
      );
    }

    const updatedWorkspace = await this.workspaceService.update(
      id,
      workspaceDTO,
    );

    return updatedWorkspace;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const workspace = await this.workspaceService.getOne(id);

    if (!workspace) {
      throw new NotFoundException(
        'Área de trabalho não encontrada ou não existe.',
      );
    }

    await this.workspaceService.delete(id);

    return;
  }
}
