import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST || '0.0.0.0',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'octo_events',
  entities: ['dist/modules/**/**/entities/*.entity.js'],
  synchronize: true,
});
