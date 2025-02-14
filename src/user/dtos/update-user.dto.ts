import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'John Doe',
  })
  name?: string;

  @ApiProperty({
    type: 'string',
    example: 'jdfkjdf-43j4hhjhdfu0eiqoi',
  })
  googleId?: string;
}
