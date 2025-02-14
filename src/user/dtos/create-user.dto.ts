import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'johndoe@mail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: 'string',
    example: '************',
  })
  @IsString()
  password: string;

  @Exclude()
  googleId?: string;
}
