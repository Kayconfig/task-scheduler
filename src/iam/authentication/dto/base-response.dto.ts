import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  @ApiProperty({
    type: 'number',
    example: HttpStatus.OK,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    example: null,
  })
  error: string | null;

  @ApiProperty({
    example: 'success',
  })
  message: string;

  data: T;
}
