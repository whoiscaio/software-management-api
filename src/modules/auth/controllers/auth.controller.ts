import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignupDTO } from '../dtos/signup.dto';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dtos/login.dto';
import { JwtService } from 'src/shared/services/jwt.service';
import { plainToClass } from 'class-transformer';
import { User } from '../models/user.model';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(200)
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

    const jwt = this.jwtService.sign({ user: plainToClass(User, user) });

    return { token: jwt };
  }

  @Post('signup')
  async signup(@Body() signupDTO: SignupDTO) {
    const { username, password } = signupDTO;

    const isUsernameTaken = !!(await this.authService.findByUsername(username));

    if (isUsernameTaken) {
      throw new BadRequestException('Nome de usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.authService.createUser(username, hashedPassword);

    return;
  }
}
