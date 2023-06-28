import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DefaultErrorResponse } from '../../shared/dto/default-error-response.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    summary: 'Find users',
  })
  @ApiOkResponse({
    description: 'Users have been found',
    type: [UserDto],
  })
  @ApiBadRequestResponse({
    description: 'Could not find users',
    type: DefaultErrorResponse,
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Find a user',
  })
  @ApiOkResponse({
    description: 'User have been found',
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'Could not find an user',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }
}
