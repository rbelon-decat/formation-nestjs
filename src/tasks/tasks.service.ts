import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly tasksRepository: TasksRepository
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with id "${id}" was not found`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id: string, newStatus: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = newStatus;

    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return result;
  }
}
