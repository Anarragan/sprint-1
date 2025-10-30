import { IsString, IsOptional, IsBoolean, Length, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @IsString()
    @Length(1, 200)
    @ApiProperty({ example: 'Task title' })
    title: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Task description' })
    description?: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ example: false })
    completed?: boolean;

    @IsOptional()
    @IsInt()
    @ApiProperty({ example: 1 })
    userId?: number;
}