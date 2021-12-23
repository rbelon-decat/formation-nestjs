import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import exp from 'constants';
import { TasksRepositoryMock } from '../mocks/TasksRepository.mock';
import { UserMock } from '../mocks/User.mock';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRespository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: TasksRepositoryMock },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRespository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls getTasks & return the results', async () => {
      expect(tasksRespository.getTasks).not.toHaveBeenCalled();
      tasksRespository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, UserMock);
      expect(tasksRespository.getTasks).toHaveBeenCalled();
      expect(result).toBe('someValue');
    });
  });

  describe('getTaskById', () => {
    it('call findOne and return the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test description',
        id: 'someId',
        status: TaskStatus.OPEN,
      };

      tasksRespository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', UserMock);

      expect(result).toEqual(mockTask);
    });

    it('call findOne and handle an error', async () => {
      tasksRespository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', UserMock)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
