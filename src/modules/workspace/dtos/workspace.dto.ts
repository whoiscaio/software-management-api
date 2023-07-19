import { IsNotEmpty, IsUUID } from 'class-validator';

export class WorkspaceDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsUUID()
  team_id: string;
}
