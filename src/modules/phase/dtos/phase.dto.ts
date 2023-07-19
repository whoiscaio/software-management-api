import { IsNotEmpty, IsUUID } from 'class-validator';

export class PhaseDTO {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsUUID()
  workspace_id: string;
}
