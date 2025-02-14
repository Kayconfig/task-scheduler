import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { SchemaSync1739538268269 } from 'src/migrations/1739538268269-SchemaSync';

config();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User],
  migrations: [SchemaSync1739538268269],
});
