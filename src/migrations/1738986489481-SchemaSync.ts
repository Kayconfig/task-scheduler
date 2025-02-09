import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1738986489481 implements MigrationInterface {
  name = 'SchemaSync1738986489481';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
  }
}
