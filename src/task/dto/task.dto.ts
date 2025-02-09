import { ApiProperty } from '@nestjs/swagger';
import { Priorities } from '../entities/constants';
import { Task } from '../entities/task.entity';

export class TaskDto {
  @ApiProperty({
    type: String,
    example: '2c20dcb6-5f7b-4e87-a379-f99fc8370674',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Send emails to the prop firms',
  })
  title: string;

  @ApiProperty({
    type: String,
    example: new Date().toISOString(),
  })
  deadline: string;

  @ApiProperty({
    enum: Priorities,
    example: Priorities.URGENT,
  })
  priority: Priorities;

  @ApiProperty({
    type: String,
    example: new Date().toISOString(),
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    example: new Date().toISOString(),
  })
  updatedAt: string;

  @ApiProperty({
    type: String,
    example: '2cd5ed86-a0fa-485c-afb2-b8d93b772a28',
  })
  ownerId: string;

  static create(input: Task): TaskDto {
    const taskDto = new TaskDto();
    taskDto.title = input.title;
    taskDto.createdAt = input.createdAt.toISOString();
    taskDto.updatedAt = input.updatedAt.toISOString();
    taskDto.deadline = input.deadline;
    taskDto.priority = input.priority;
    taskDto.ownerId = input.ownerId;
    taskDto.id = input.id;

    return taskDto;
  }
}
