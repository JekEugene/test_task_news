import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { ICreateRefreshToken } from './interfaces/create-refresh-token.interface';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {}

  async create(
    createRefreshToken: ICreateRefreshToken,
  ): Promise<RefreshTokenEntity> {
    const refreshToken = await this.refreshTokenRepository.save(
      createRefreshToken,
    );
    return refreshToken;
  }

  async delete(token: string): Promise<boolean> {
    const res = await this.refreshTokenRepository.delete({ token });
    return Boolean(res.affected);
  }
}
