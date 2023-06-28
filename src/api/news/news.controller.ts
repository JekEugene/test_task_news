import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserId } from '../../shared/decorators/get-user-id.decorator';
import { DefaultErrorResponse } from '../../shared/dto/default-error-response.dto';
import { NewsDto } from './dto/user.dto';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({
    summary: 'create news',
  })
  @ApiCreatedResponse({
    description: 'news created',
    type: NewsDto,
  })
  @ApiBadRequestResponse({
    description: 'Could not create news',
    type: DefaultErrorResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createNewsDto: CreateNewsDto, @GetUserId() userId: number) {
    return this.newsService.create({ ...createNewsDto, userId });
  }

  @ApiOperation({
    summary: 'get list of news',
  })
  @ApiOkResponse({
    description: 'news received',
    type: [NewsDto],
  })
  @ApiBadRequestResponse({
    description: 'Could not get list of news',
    type: DefaultErrorResponse,
  })
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @ApiOperation({
    summary: 'get of news',
  })
  @ApiOkResponse({
    description: 'news received',
    type: [NewsDto],
  })
  @ApiBadRequestResponse({
    description: 'Could not get news',
    type: DefaultErrorResponse,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(Number(id));
  }

  @ApiOperation({
    summary: 'updated news',
  })
  @ApiOkResponse({
    description: 'news updated',
    type: [NewsDto],
  })
  @ApiForbiddenResponse({
    description: 'Could not get news',
    type: DefaultErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'Could not get news',
    type: DefaultErrorResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @GetUserId() userId: number,
  ) {
    return this.newsService.update({
      id: Number(id),
      userId,
      updateDto: updateNewsDto,
    });
  }

  @ApiOperation({
    summary: 'delete news',
  })
  @ApiOkResponse({
    description: 'news deleted',
    type: [NewsDto],
  })
  @ApiForbiddenResponse({
    description: 'Could not delete',
    type: DefaultErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'Could not delete',
    type: DefaultErrorResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @GetUserId() userId: number) {
    return this.newsService.remove({ id: Number(id), userId });
  }
}
