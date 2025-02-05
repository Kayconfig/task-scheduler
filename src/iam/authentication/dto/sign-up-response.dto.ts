import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base-response.dto';
import { UserDto } from './user.dto';
import { HttpStatus } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export class SignUpResponseDto extends BaseResponseDto<UserDto> {
  @ApiProperty({
    type: UserDto,
  })
  data: UserDto;

  static create(data: User): SignUpResponseDto {
    const dto = new SignUpResponseDto();
    dto.error = null;
    dto.message = 'success';
    dto.statusCode = HttpStatus.CREATED;
    dto.data = UserDto.create(data);
    return dto;
  }
}
