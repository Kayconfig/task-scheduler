import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationParamsDto } from '../common/dtos/pagination-params.dto';
import { TaskRepository } from './repository/task-repository';
import { FindAllTaskResponseDto } from './dto/find-all-response.dto';
import { CreateTaskResponse } from './dto/create-task-response.dto';
import { FindOneResponseDto } from './dto/find-one-response.dto';
import { IUpdateTaskCriteria } from './interfaces/update-task-criteria.interface';
import { UpdateTaskResponseDto } from './dto/update-task-response.dto';
import { IDeleteTaskCriteria } from './interfaces/delete-task-criter.interface';
import { DeleteTaskResponseDto } from './dto/delete-task-response.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<CreateTaskResponse> {
    if (!userId) {
      throw new InternalServerErrorException(
        'Unable to service request. Please try again later.',
      );
    }
    const task = await this.taskRepository.create(createTaskDto, userId);
    return CreateTaskResponse.create(task);
  }

  async findAll(
    paginationParams: PaginationParamsDto,
    userId: string,
  ): Promise<FindAllTaskResponseDto> {
    const tasks = await this.taskRepository.find({
      where: { userId },
      skip: paginationParams.offset,
      take: paginationParams.limit,
      order: { createdAt: 'DESC' },
    });
    return FindAllTaskResponseDto.create(tasks);
  }

  async findOne(id: string, userId: string): Promise<FindOneResponseDto> {
    const task = await this.taskRepository.findOneBy({ id, userId });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }
    return FindOneResponseDto.create(task);
  }

  async update(
    updateCriteria: IUpdateTaskCriteria,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskResponseDto> {
    const updatedTask = await this.taskRepository.update(
      updateCriteria,
      updateTaskDto,
    );

    if (!updatedTask) {
      throw new NotFoundException('Unable to update task. Task not found.');
    }
    return UpdateTaskResponseDto.create(updatedTask);
  }

  async remove(criteria: IDeleteTaskCriteria): Promise<DeleteTaskResponseDto> {
    await this.taskRepository.remove(criteria);
    return DeleteTaskResponseDto.create();
  }
}
