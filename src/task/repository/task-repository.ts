import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { Task } from '../entities/task.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { IUpdateTaskCriteria } from '../interfaces/update-task-criteria.interface';
import { IDeleteTaskCriteria } from '../interfaces/delete-task-criter.interface';

export abstract class TaskRepository {
  abstract create(task: CreateTaskDto, userId: string): Promise<Task>;
  abstract update(
    criteria: IUpdateTaskCriteria,
    partialEntity: QueryDeepPartialEntity<Task>,
  ): Promise<Task | null>;
  abstract findOneBy(
    where: FindOptionsWhere<Task> | FindOptionsWhere<Task>[],
  ): Promise<Task | null>;
  abstract find(options?: FindManyOptions<Task>): Promise<Task[]>;
  abstract remove(criteria: IDeleteTaskCriteria): Promise<void>;
}
