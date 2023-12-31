import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import TypeOrmModuleConfig from './config/typeorm.config';
import { TeamModule } from './modules/team/team.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { PhaseModule } from './modules/phase/phase.module';
import { ProcessModule } from './modules/process/process.module';
import { SubprocessModule } from './modules/subprocess/subprocess.module';
import { MainModule } from './modules/main/main.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmModuleConfig),
    AuthModule,
    TeamModule,
    WorkspaceModule,
    PhaseModule,
    ProcessModule,
    SubprocessModule,
    MainModule,
  ],
})
export class AppModule {}
