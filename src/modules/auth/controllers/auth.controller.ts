import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignupDTO } from '../dtos/signup.dto';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dtos/login.dto';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const { username, password } = loginDTO;

    const user = await this.authService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { username: user.username };

    return payload;
  }

  @Post('signup')
  async signup(@Body() signupDTO: SignupDTO) {
    const { username, password } = signupDTO;

    const isUsernameTaken = !!(await this.authService.findByUsername(username));

    if (isUsernameTaken) {
      throw new BadRequestException('Nome de usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.authService.createUser(username, hashedPassword);

    return newUser;
  }
}
