import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const TypeOrmModuleConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'db_sw_process_management',
  entities: ['dist/**/*.model.ts'],
  synchronize: true,
};

export default TypeOrmModuleConfig;
