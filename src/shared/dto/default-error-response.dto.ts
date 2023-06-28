import { ApiProperty } from '@nestjs/swagger';

export class DefaultErrorResponse {
  @ApiProperty({
    description: 'statusCode',
    type: 'number',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'message',
    type: 'string',
    example: 'User not found',
  })
  message: string;

  @ApiProperty({
    description: 'error',
    type: 'string',
    example: 'Not Found',
  })
  error: string;
}
