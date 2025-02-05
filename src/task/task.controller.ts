import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationParamsDto } from 'src/common/dtos/pagination-params.dto';
import { FindAllTaskResponseDto } from './dto/find-all-response.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateTaskResponse } from './dto/create-task-response.dto';
import { FindOneResponseDto } from './dto/find-one-response.dto';
import { UpdateTaskResponseDto } from './dto/update-task-response.dto';
import { DeleteTaskResponseDto } from './dto/delete-task-response.dto';
import { TaskNotFoundResponseDto } from './dto/task-not-found-response.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('error')
  throwError() {
    throw new InternalServerErrorException();
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateTaskResponse,
  })
  create(
    @Body() createTaskDto: CreateTaskDto,
    userId: string = 'test-user-id',
  ): Promise<CreateTaskResponse> {
    console.log({ createTaskDto });
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  @ApiOkResponse({
    type: FindAllTaskResponseDto,
  })
  findAll(
    @Query() paginationParam: PaginationParamsDto,
    userId: string = 'test-user-id',
  ) {
    return this.taskService.findAll(paginationParam, userId);
  }

  @Get(':id')
  @ApiOkResponse({
    type: FindOneResponseDto,
  })
  @ApiNotFoundResponse({
    type: TaskNotFoundResponseDto,
  })
  findOne(@Param('id') id: string, userId: string = 'test-user-id') {
    return this.taskService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: UpdateTaskResponseDto,
  })
  @ApiNotFoundResponse({
    type: TaskNotFoundResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    userId: string = 'test-user-id',
  ) {
    return this.taskService.update({ userId, taskId: id }, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: DeleteTaskResponseDto,
  })
  remove(@Param('id') id: string, userId: string = 'test-user-id') {
    return this.taskService.remove({ userId, taskId: id });
  }
}
