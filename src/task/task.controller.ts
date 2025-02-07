import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationParamsDto } from 'src/common/dtos/pagination-params.dto';
import { FindAllTaskResponseDto } from './dto/find-all-response.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateTaskResponse } from './dto/create-task-response.dto';
import { FindOneResponseDto } from './dto/find-one-response.dto';
import { UpdateTaskResponseDto } from './dto/update-task-response.dto';
import { TaskNotFoundResponseDto } from './dto/task-not-found-response.dto';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { IActiveUser } from 'src/iam/decorators/interface/active-user.interface';

@Controller('task')
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateTaskResponse,
  })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @ActiveUser() activeUser: IActiveUser,
  ): Promise<CreateTaskResponse> {
    return this.taskService.create(createTaskDto, activeUser.sub);
  }

  @Get()
  @ApiOkResponse({
    type: FindAllTaskResponseDto,
  })
  findAll(
    @Query() paginationParam: PaginationParamsDto,
    @ActiveUser() activeUser: IActiveUser,
  ) {
    return this.taskService.findAll(paginationParam, activeUser.sub);
  }

  @Get(':id')
  @ApiOkResponse({
    type: FindOneResponseDto,
  })
  @ApiNotFoundResponse({
    type: TaskNotFoundResponseDto,
  })
  findOne(@Param('id') id: string, @ActiveUser() activeUser: IActiveUser) {
    return this.taskService.findOne(id, activeUser.sub);
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
    @ActiveUser() activeUser: IActiveUser,
  ) {
    return this.taskService.update(
      { userId: activeUser.sub, taskId: id },
      updateTaskDto,
    );
  }

  @Delete(':id')
  @ApiNoContentResponse({})
  remove(@Param('id') id: string, @ActiveUser() activeUser: IActiveUser) {
    return this.taskService.remove({ userId: activeUser.sub, taskId: id });
  }
}
