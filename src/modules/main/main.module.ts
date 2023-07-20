import { Module } from '@nestjs/common';
import { MainController } from './controllers/main.controller';

@Module({
  controllers: [MainController],
})
export class MainModule {}
