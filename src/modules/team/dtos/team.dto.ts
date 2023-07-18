import { IsNotEmpty } from 'class-validator';

export class TeamDTO {
  @IsNotEmpty()
  name: string;
}
