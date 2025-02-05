import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionResponseDto {
  @ApiProperty({
    type: 'number',
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: number;

  @ApiProperty({
    type: 'string',
    example: 'error',
  })
  error: string;

  @ApiProperty({
    type: 'string',
    example: 'sample error message',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    example: null,
  })
  data: string | null;
}
