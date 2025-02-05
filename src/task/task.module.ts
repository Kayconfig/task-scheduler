import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskRepository } from './repository/task-repository';
import { PostgresTaskRepository } from './repository/postgres-task-repo';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [
    TaskService,

    {
      provide: TaskRepository,
      useClass: PostgresTaskRepository,
    },
  ],
})
export class TaskModule {}
