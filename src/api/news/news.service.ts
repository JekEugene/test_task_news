import { Injectable } from '@nestjs/common';
import { DefaultResponse } from '../../shared/dto/default-response.dto';
import { NewsDto } from './dto/user.dto';
import { ICreateNews } from './interfaces/create-news.interface';
import { IUpdateNews } from './interfaces/update-news.interface';
import { NewsRepository } from './news.repository';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepo: NewsRepository) {}

  async create(createNews: ICreateNews): Promise<NewsDto> {
    const news = await this.newsRepo.create(createNews);
    return news;
  }

  async findAll(): Promise<NewsDto[]> {
    const news = await this.newsRepo.getAll();
    return news;
  }

  async findOne(id: number): Promise<NewsDto> {
    const news = await this.newsRepo.getById(id);
    return news;
  }

  async update(updateNews: IUpdateNews): Promise<DefaultResponse> {
    const isUpdated = await this.newsRepo.update(updateNews);
    return { success: isUpdated };
  }

  async remove(id: number): Promise<DefaultResponse> {
    const isDeleted = await this.newsRepo.delete(id);
    return { success: isDeleted };
  }
}
