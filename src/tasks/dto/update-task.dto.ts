import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiPropertyOptional({ example: 'Task title changed' })
    title?: string;

    @ApiPropertyOptional({ example: 'Task description changed' })
    description?: string;

    @ApiPropertyOptional({ example: true })
    completed?: boolean;
}