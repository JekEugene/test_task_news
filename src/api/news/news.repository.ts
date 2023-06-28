import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorMessage } from '../../shared/enums/error-message.enum';
import { PostgresErrorCode } from '../../shared/enums/postgres-error-code.enum';
import { NewsEntity } from './entities/news.entity';
import { ICreateNews } from './interfaces/create-news.interface';
import { IUpdateNewsRepo } from './interfaces/update-news-repo.interface';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async create(createNewsData: ICreateNews): Promise<NewsEntity> {
    try {
      const news = await this.newsRepository.save(createNewsData);
      return news;
    } catch (error) {
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
        throw new ConflictException(ErrorMessage.NewsAlreadyExist);
      }
      throw new BadRequestException(ErrorMessage.CreateNewsError);
    }
  }

  async getAll(): Promise<NewsEntity[]> {
    const news = await this.newsRepository.find();
    return news;
  }

  async getById(id: number): Promise<NewsEntity> {
    const news = await this.newsRepository.findOne({
      where: { id },
    });
    return news;
  }

  async update({ id, updateDto }: IUpdateNewsRepo): Promise<boolean> {
    try {
      const result = await this.newsRepository.update({ id }, updateDto);
      return Boolean(result.affected);
    } catch (error) {
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
        throw new ConflictException(ErrorMessage.NewsAlreadyExist);
      }
      throw new BadRequestException(ErrorMessage.UpdateNewsError);
    }
  }

  async delete(id: number): Promise<boolean> {
    const res = await this.newsRepository.delete({ id });
    return Boolean(res.affected);
  }
}
