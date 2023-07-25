import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtSignOptions, JwtService as NestJwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/jwt.config';
import { User } from 'src/modules/auth/models/user.model';

@Injectable()
export class JwtService {
  private readonly jwtService: NestJwtService;

  constructor() {
    this.jwtService = new NestJwtService({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    });
  }

  sign(payload: any, options?: JwtSignOptions) {
    return this.jwtService.sign(payload, options);
  }

  verify(jwt: string) {
    try {
      const { user }: { user: User } = this.jwtService.verify(jwt);

      return user;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
  }
}
