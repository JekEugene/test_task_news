import { UpdateNewsDto } from '../dto/update-news.dto';

export interface IUpdateNews {
  id: number;
  userId: number;
  updateDto: UpdateNewsDto;
}
