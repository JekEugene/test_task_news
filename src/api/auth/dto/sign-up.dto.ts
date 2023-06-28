import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'email',
    type: 'string',
    example: 'qwe@asd.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password',
    type: 'string',
    example: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
