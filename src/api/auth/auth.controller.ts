import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DefaultErrorResponse } from '../../shared/dto/default-error-response.dto';
import { DefaultResponse } from '../../shared/dto/default-response.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'signUp',
  })
  @ApiCreatedResponse({
    description: 'sign up completed',
    type: DefaultResponse,
  })
  @ApiBadRequestResponse({
    description: 'Could not create a user',
    type: DefaultErrorResponse,
  })
  @ApiConflictResponse({
    description: 'User with provided email already exist',
    type: DefaultErrorResponse,
  })
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiOperation({
    summary: 'signIn',
  })
  @ApiCreatedResponse({
    description: 'sign in completed',
    type: DefaultResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'wrong credentials',
    type: DefaultErrorResponse,
  })
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({
    summary: 'logout',
  })
  @ApiOkResponse({
    description: 'logout completed',
    type: DefaultResponse,
  })
  @Delete('logout')
  logout() {
    // return this.authService.logout();
  }
}
