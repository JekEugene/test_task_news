import { UpdateNewsDto } from '../dto/update-news.dto';

export interface IUpdateNewsRepo {
  id: number;
  updateDto: UpdateNewsDto;
}
