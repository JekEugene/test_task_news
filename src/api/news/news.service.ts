import { ForbiddenException, Injectable } from '@nestjs/common';
import { DefaultResponse } from '../../shared/dto/default-response.dto';
import { PaginationQuery } from '../../shared/dto/pagination.dto';
import { ErrorMessage } from '../../shared/enums/error-message.enum';
import { NewsDto } from './dto/user.dto';
import { ICreateNews } from './interfaces/create-news.interface';
import { IRemoveNews } from './interfaces/remove-news.interface';
import { IUpdateNews } from './interfaces/update-news.interface';
import { NewsRepository } from './news.repository';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepo: NewsRepository) {}

  async create(createNews: ICreateNews): Promise<NewsDto> {
    const news = await this.newsRepo.create(createNews);
    return news;
  }

  async findAll(pagination: PaginationQuery): Promise<NewsDto[]> {
    const news = await this.newsRepo.getAll(pagination);
    return news;
  }

  async findOne(id: number): Promise<NewsDto> {
    const news = await this.newsRepo.getById(id);
    return news;
  }

  async update({
    id,
    userId,
    updateDto,
  }: IUpdateNews): Promise<DefaultResponse> {
    const news = await this.findOne(id);
    if (news.userId !== userId) {
      throw new ForbiddenException(ErrorMessage.NotAllowedToEditProvidedNews);
    }

    const isUpdated = await this.newsRepo.update({ id, updateDto });
    return { success: isUpdated };
  }

  async remove({ id, userId }: IRemoveNews): Promise<DefaultResponse> {
    const news = await this.findOne(id);
    if (news.userId !== userId) {
      throw new ForbiddenException(ErrorMessage.NotAllowedToEditProvidedNews);
    }

    const isDeleted = await this.newsRepo.delete(id);
    return { success: isDeleted };
  }
}
