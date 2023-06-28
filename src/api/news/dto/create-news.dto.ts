import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({
    description: 'password',
    type: 'string',
    example: 'title',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
