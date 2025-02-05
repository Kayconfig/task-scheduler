import { BaseResponseDto } from 'src/common/dtos/base-response.dto';
import { TaskDto } from './task.dto';
import { HttpStatus } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskResponse extends BaseResponseDto<TaskDto> {
  @ApiProperty({
    type: TaskDto,
  })
  data: TaskDto;

  constructor() {
    super();
    this.statusCode = HttpStatus.CREATED;
    this.error = null;
  }

  static create(data: Task): CreateTaskResponse {
    const result = new CreateTaskResponse();
    result.data = TaskDto.create(data);
    return result;
  }
}
