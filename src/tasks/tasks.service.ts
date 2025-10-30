import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepo: Repository<Task>,
    ) {}

    async findAllPaginated(pagination: PaginationDto, userId?: number){
        const { page = 1, limit = 10 } = pagination;
        const skip = (page - 1) * limit;

        const where = userId ? { user: { id: userId } } : {};

        const [data, total] = await this.taskRepo.findAndCount({
            where,
            take: limit,
            skip,
            order: { id: 'DESC' },
        });

        const totalPages = Math.ceil(total / limit) || 1;

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages,
            },
        };
    }

    async findAll(): Promise<Task[]>{
        return await this.taskRepo.find();
    }

    async findOne(id: number): Promise<Task> {
        const task = await this.taskRepo.findOneBy({ id });
        if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
        return task;
    }

    async create(createDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepo.create(createDto);
        return await this.taskRepo.save(task);
    }

    async update(id: number, updateDto: UpdateTaskDto): Promise<Task> {
        await this.taskRepo.update(id, updateDto);
        return this.findOne(id); // volver a cargar y retornar
    }

    async delete(id: number): Promise<void> {
        const result = await this.taskRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }
    }
}
