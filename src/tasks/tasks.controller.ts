import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Query, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from './dto/pagination.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    getAllPag(@Query() pagination: PaginationDto, @Req() req) {
        const userId = req.user.id;
        return this.tasksService.findAllPaginated(pagination, userId)
    }
}
