import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import TypeOrmModuleConfig from './config/typeorm.config';
import { TeamModule } from './modules/team/team.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmModuleConfig),
    AuthModule,
    TeamModule,
    WorkspaceModule,
  ],
})
export class AppModule {}
