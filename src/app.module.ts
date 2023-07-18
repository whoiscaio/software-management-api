import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import TypeOrmModuleConfig from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmModuleConfig), AuthModule],
})
export class AppModule {}
