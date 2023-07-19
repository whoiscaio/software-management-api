import { IsNotEmpty, IsUUID } from 'class-validator';

export class SubprocessDTO {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsUUID()
  process_id: string;
}
