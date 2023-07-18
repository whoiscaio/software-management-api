import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private relations = ['teams'];

  async findByUsername(username: string, eager?: boolean) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: eager ? this.relations : [],
    });

    return user;
  }

  async createUser(username: string, hashedPassword: string) {
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return user;
  }
}
