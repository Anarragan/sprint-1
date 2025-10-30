import { IsInt, Min, Max, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationDto {
    @ApiPropertyOptional({ example: 1, description: 'Pagina actual (>=1)' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1

    @ApiPropertyOptional({ example: 10, description: 'Cantidad de registros por página' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10
}