import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: 'string',
    example: 'user@mail.com',
  })
  email: string;

  @IsString()
  @MinLength(10)
  @ApiProperty({
    type: 'string',
    example: 'samplePasswordInPlainText',
  })
  password: string;
}
