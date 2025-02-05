import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/common/dtos/base-response.dto';

export class DeleteTaskResponseDto extends BaseResponseDto<string | null> {
  @ApiProperty({
    example: null,
  })
  data: string | null;

  static create(): DeleteTaskResponseDto {
    const response = new DeleteTaskResponseDto();
    response.statusCode = HttpStatus.OK;
    response.error = null;
    response.data = null;
    return response;
  }
}
