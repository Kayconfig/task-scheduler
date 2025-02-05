import { BaseResponseDto } from '../../common/dtos/base-response.dto';
import { Task } from '../entities/task.entity';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { TaskDto } from './task.dto';

export class FindAllTaskResponseDto extends BaseResponseDto<TaskDto[]> {
  constructor() {
    super();
    this.statusCode = HttpStatus.OK;
    this.error = null;
  }
  @ApiProperty({
    type: TaskDto,
    isArray: true,
  })
  data: TaskDto[];

  static create(inputData: Task[]): FindAllTaskResponseDto {
    const dto = new FindAllTaskResponseDto();
    dto.data = inputData.map((task) => TaskDto.create(task));
    return dto;
  }
}
