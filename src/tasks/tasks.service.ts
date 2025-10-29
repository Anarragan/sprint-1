import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { PaginationDto } from './dto/pagination.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  create(dto: CreateTaskDto, userId?: number) {
    const task = this.tasksRepository.create({ ...dto, user_id: userId });
    return this.tasksRepository.save(task);
  }

  async findAll(userId: number, paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const [tasks, total] = await this.tasksRepository.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: tasks,
      total,
      page,
      limit,
    };
  }

  findOne(id: number) {
    return this.tasksRepository.findOneBy({ id });
  }

  update(id: number, dto: UpdateTaskDto) {
    return this.tasksRepository.update(id, dto);
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
