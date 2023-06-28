import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponse {
  @ApiProperty({
    description: 'success',
    type: 'boolean',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'message',
    type: 'string',
    example: 'message',
    nullable: true,
  })
  message?: string;
}
