import { IsNotEmpty } from 'class-validator';

export class SignupDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
