import { BaseResponseDto } from 'src/common/dtos/base-response.dto';
import { TaskDto } from './task.dto';
import { HttpStatus } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskResponseDto extends BaseResponseDto<TaskDto> {
  @ApiProperty({
    type: TaskDto,
  })
  data: TaskDto;

  static create(task: Task): UpdateTaskResponseDto {
    const response = new UpdateTaskResponseDto();
    response.statusCode = HttpStatus.OK;
    response.error = null;
    response.data = TaskDto.create(task);
    return response;
  }
}
