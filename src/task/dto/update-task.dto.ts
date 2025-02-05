import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Priorities } from '../entities/constants';
import { IsNotPastDate } from './constraints/deadline-constraint';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Prepare mails for sending.',
    nullable: true,
  })
  title: string;
  @ApiProperty({
    type: String,
    example: '2025-01-31T01:31:08.965Z',
    description: 'A valid date string',
    nullable: true,
  })
  @IsNotPastDate({ message: 'deadline must not be in the past' })
  deadline: string;

  @ApiProperty({
    enum: Priorities,
    example: Priorities.NORMAL,
    nullable: true,
  })
  priority: Priorities;
}
