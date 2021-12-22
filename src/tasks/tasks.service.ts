import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getTasks();

    if (status) {
      tasks = tasks.filter((task) => status === task.status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => id === task.id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, newStatus: TaskStatus): Task {
    const task = this.getTaskById(id);

    task.status = newStatus;
    return task;
  }

  deleteTask(id: string): string {
    const index = this.tasks.findIndex((task) => id === task.id);
    if (index < 0) {
      throw new NotFoundException();
    }
    this.tasks.splice(index, 1);
    return `Task #${id} deleted !`;
  }
}
