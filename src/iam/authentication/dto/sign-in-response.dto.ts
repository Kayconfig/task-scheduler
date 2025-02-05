import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseResponseDto } from './base-response.dto';
import { HttpStatus } from '@nestjs/common';

export class SignInResponseDataDto {
  @ApiProperty({
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @IsString()
  accessToken: string;
}

export class SignInResponseDto extends BaseResponseDto<SignInResponseDataDto> {
  @ApiProperty({
    type: SignInResponseDataDto,
  })
  data: null;

  static create(): SignInResponseDto {
    const dto = new SignInResponseDto();

    dto.error = null;
    dto.message = 'success';
    dto.statusCode = HttpStatus.OK;
    dto.data = null;

    return dto;
  }
}
