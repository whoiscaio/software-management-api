import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProcessDTO {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsUUID()
  phase_id: string;
}
