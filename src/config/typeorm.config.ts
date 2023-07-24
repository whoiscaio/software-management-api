import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const TypeOrmModuleConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'db_sw_process_management',
  entities: ['dist/modules/**/models/*.model.js'],
  synchronize: true,
};

export default TypeOrmModuleConfig;
