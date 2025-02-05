import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionResponseDto } from './http-exception-response.dto';
import { HttpStatus } from '@nestjs/common';
import { USER_EMAIL_ALREADY_EXIST_ERR_MSG } from 'src/user/constants/error-msg';

export class ConflictExceptionResponseDto extends HttpExceptionResponseDto {
  @ApiProperty({
    example: HttpStatus.CONFLICT,
  })
  statusCode: number;

  @ApiProperty({
    example: 'conflict',
  })
  error: string;

  @ApiProperty({
    example: USER_EMAIL_ALREADY_EXIST_ERR_MSG,
  })
  message: string;
}
