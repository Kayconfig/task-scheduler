import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
    default: HttpStatus.OK,
  })
  statusCode: HttpStatus;

  data: T;

  @ApiProperty({
    example: null,
    default: null,
  })
  error: string | null;
}
