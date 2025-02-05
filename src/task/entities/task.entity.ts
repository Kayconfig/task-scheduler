import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Priorities } from './constants';
import { CreateTaskDto } from '../dto/create-task.dto';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  deadline: string;

  @Column({ enum: Priorities })
  priority: Priorities;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt?: Date;

  @Column()
  userId: string;

  static create(
    { title, deadline, priority }: CreateTaskDto,
    userId: string,
  ): Task {
    const createdTask = new Task();
    createdTask.title = title;
    createdTask.deadline = deadline;
    createdTask.priority = priority;
    createdTask.userId = userId;
    return createdTask;
  }
}
