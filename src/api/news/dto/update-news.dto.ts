import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNewsDto {
  @ApiProperty({
    description: 'password',
    type: 'string',
    example: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
