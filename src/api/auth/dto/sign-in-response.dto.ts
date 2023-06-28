import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInResponseDto {
  @ApiProperty({
    description: 'accessToken',
    type: 'string',
    example: 'qwe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    description: 'refreshToken',
    type: 'string',
    example: 'asd',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
