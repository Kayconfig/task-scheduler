import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PaginationParamsDto } from '../common/dtos/pagination-params.dto';
import { Task } from './entities/task.entity';
import { randomUUID } from 'crypto';
import { Priorities } from './entities/constants';
import { faker } from '@faker-js/faker';
import { TaskRepository } from './repository/task-repository';
import { FindAllTaskResponseDto } from './dto/find-all-response.dto';
import { FindManyOptions } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
            find: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    let userId: string;
    let tenMinutesInMilliseconds;
    beforeAll(() => {
      userId = '2cd5ed86-a0fa-485c-afb2-b8d93b772a28';
      tenMinutesInMilliseconds = 10 * 60 * 1000;
    });
    it('should create task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Random Title',
        deadline: '2025-01-31T01:31:08.965Z',
        priority: Priorities.URGENT,
        userId: userId,
      };
      const createdAt = new Date(Date.now() + tenMinutesInMilliseconds);
      const expectedTask: Task = {
        createdAt,
        updatedAt: createdAt,
        id: 'test-task-id',
        userId,
        title: createTaskDto.title,
        deadline: createTaskDto.deadline,
        priority: createTaskDto.priority,
      };
      jest
        .spyOn(taskRepository, 'create')
        .mockImplementation(async (createTaskInput) => {
          expect(createTaskInput).toEqual(createTaskDto);
          return expectedTask;
        });
      const result = await service.create(createTaskDto);

      expect(result).toEqual<TaskDto>({
        ...expectedTask,
        createdAt: expectedTask.createdAt.toISOString(),
        updatedAt: expectedTask.updatedAt.toISOString(),
      });
    });
  });

  describe('findAll', () => {
    let userId: string;
    let mockTasks: Task[];
    const maxTasksCount = 3;

    beforeAll(() => {
      userId = 'test-user-id';
      mockTasks = createMockTasks(maxTasksCount, userId);
    });
    it('should return all tasks for a user', async () => {
      const paginationParams = PaginationParamsDto.create();

      jest
        .spyOn(taskRepository, 'find')
        .mockImplementation(async (findOptions) => {
          expect(findOptions).toEqual<FindManyOptions<Task>>({
            take: 100,
            skip: 0,
            where: {
              userId,
            },
          });
          return mockTasks;
        });

      const result: FindAllTaskResponseDto = await service.findAll(
        paginationParams,
        userId,
      );
      const expectedResult: FindAllTaskResponseDto =
        FindAllTaskResponseDto.create(mockTasks);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return correct task');
  });
});

function createMockTasks(numOfTasks: number, userId: string): Task[] {
  const result: Task[] = [];
  for (let i = 0; i < numOfTasks; i++) {
    result.push(createMockTask(userId));
  }
  return result;
}

function createMockTask(userId: string, priority = Priorities.NORMAL): Task {
  const createdAt = new Date();
  const tenMinutesInMilliseconds = 10 * 60 * 1000;
  const tenMinutesDeadLine = new Date(Date.now() + tenMinutesInMilliseconds);
  return {
    id: randomUUID(),
    createdAt,
    deadline: tenMinutesDeadLine.toISOString(),
    priority,
    title: faker.food.fruit(),
    updatedAt: createdAt,
    userId,
  };
}
