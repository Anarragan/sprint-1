import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
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
}
