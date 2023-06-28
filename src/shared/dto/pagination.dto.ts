import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationQuery {
  @ApiProperty({
    description: 'take',
    type: 'number',
    example: 10,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  take?: number;

  @ApiProperty({
    description: 'skip',
    type: 'number',
    example: 20,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  skip?: number;
}
