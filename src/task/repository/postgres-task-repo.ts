import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task-repository';
import { FindOptionsWhere, FindManyOptions, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IUpdateTaskCriteria } from '../interfaces/update-task-criteria.interface';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class PostgresTaskRepository extends TaskRepository {
  public constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {
    super();
  }
  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = this.repository.create({ ...createTaskDto, ownerId: userId });
    return this.repository.save(task);
  }
  async update(
    criteria: IUpdateTaskCriteria,
    partialTask: UpdateTaskDto,
  ): Promise<Task | null> {
    const preloadedTask = await this.repository.preload({
      ...partialTask,
      id: criteria.taskId,
    });
    if (!preloadedTask) {
      return null;
    }

    return this.repository.save(preloadedTask);
  }
  async findOneBy(
    where: FindOptionsWhere<Task> | FindOptionsWhere<Task>[],
  ): Promise<Task | null> {
    return this.repository.findOneBy(where);
  }
  async find(options?: FindManyOptions<Task>): Promise<Task[]> {
    return this.repository.find(options);
  }
  async remove(criteria: IUpdateTaskCriteria): Promise<void> {
    await this.repository.delete({
      id: criteria.taskId,
      ownerId: criteria.userId,
    });
  }
}
