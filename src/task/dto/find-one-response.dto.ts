import { BaseResponseDto } from 'src/common/dtos/base-response.dto';
import { TaskDto } from './task.dto';
import { Task } from '../entities/task.entity';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneResponseDto extends BaseResponseDto<TaskDto> {
  @ApiProperty({
    type: TaskDto,
  })
  data: TaskDto;

  static create(task: Task): FindOneResponseDto {
    const result = new FindOneResponseDto();
    result.statusCode = HttpStatus.OK;
    result.error = null;
    result.data = TaskDto.create(task);
    return result;
  }
}
