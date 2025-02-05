import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
export class PaginationParamsDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    default: 100,
    required: false,
  })
  limit: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    default: 0,
    required: false,
  })
  @Type(() => Number)
  offset: number;
  constructor() {
    this.limit = 100;
    this.offset = 0;
  }

  static create(): PaginationParamsDto {
    return new PaginationParamsDto();
  }
}
