import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmModuleConfig from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmModuleConfig)],
})
export class AppModule {}
