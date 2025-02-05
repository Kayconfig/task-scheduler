import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Priorities } from '../entities/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotPastDate } from './constraints/deadline-constraint';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Prepare mails for sending.',
  })
  title: string;
  @ApiProperty({
    type: String,
    example: '2025-01-31T01:31:08.965Z',
    description: 'A valid date string',
  })
  @IsNotPastDate({ message: 'deadline must not be in the past' })
  deadline: string;

  @ApiProperty({
    enum: Priorities,
    example: Priorities.NORMAL,
  })
  @IsEnum(Priorities)
  priority: Priorities;
}
