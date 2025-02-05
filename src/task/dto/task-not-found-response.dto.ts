import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/common/dtos/base-response.dto';

export class TaskNotFoundResponseDto extends BaseResponseDto<string | null> {
  @ApiProperty({
    type: Number,
    example: HttpStatus.NOT_FOUND,
    default: HttpStatus.NOT_FOUND,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    example: 'Not Found',
  })
  error: string;

  @ApiProperty({
    example: 'Task not found',
  })
  message: string;
}
