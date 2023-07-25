import { IsNotEmpty, IsUUID } from 'class-validator';

export class WorkspaceDTO {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsUUID()
  team_id: string;
}
