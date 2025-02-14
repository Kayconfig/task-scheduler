import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1739538268269 implements MigrationInterface {
  name = 'SchemaSync1739538268269';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "googleId" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleId"`);
  }
}
