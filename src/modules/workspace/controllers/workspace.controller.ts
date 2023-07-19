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
import { TeamService } from 'src/modules/team/services/team.service';

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
      throw new NotFoundException('workspace not found');
    }

    return workspace;
  }

  @Post()
  async create(@Body() workspaceDTO: WorkspaceDTO) {
    await this.workspaceService.create(workspaceDTO);

    return;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() workspaceDTO: WorkspaceDTO,
  ) {
    const existingworkspace = await this.workspaceService.getOne(id);

    if (!existingworkspace) {
      throw new NotFoundException('Workspace not found');
    }

    const updatedworkspace = await this.workspaceService.update(
      id,
      workspaceDTO,
    );

    return updatedworkspace;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const workspace = await this.workspaceService.getOne(id);

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    await this.workspaceService.delete(id);

    return;
  }
}
