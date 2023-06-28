import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class NewsDto {
  @ApiProperty({
    description: 'id',
    type: 'number',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'email',
    type: 'string',
    example: 'qwe@test.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'userId',
    type: 'number',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
