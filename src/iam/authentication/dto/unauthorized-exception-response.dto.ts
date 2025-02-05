import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionResponseDto } from './http-exception-response.dto';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedExceptionResponseDto extends HttpExceptionResponseDto {
  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;
}
