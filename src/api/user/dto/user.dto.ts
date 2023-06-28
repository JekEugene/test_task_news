import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'id',
    type: 'number',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'email',
    type: 'string',
    example: 'qwe@test.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
