import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class UserDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: '0b9f1ec4-0e7a-4f31-b473-222ff6659ca0',
  })
  id: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'John Doe',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    type: 'string',
    example: 'johndoe@mail.com',
  })
  email: string;

  static create(user: User): UserDto {
    const userDto = new UserDto();
    userDto.email = user.email;
    userDto.name = user.name;
    userDto.id = user.id;

    return userDto;
  }
}
