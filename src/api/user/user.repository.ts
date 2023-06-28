import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorMessage } from '../../shared/enums/error-message.enum';
import { PostgresErrorCode } from '../../shared/enums/postgres-error-code.enum';
import { UserEntity } from './entities/user.entity';
import { ICreateUser } from './interfaces/create-user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserData: ICreateUser): Promise<UserEntity> {
    try {
      const user = await this.userRepository.save(createUserData);
      return user;
    } catch (error) {
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
        throw new ConflictException(ErrorMessage.UserAlreadyExist);
      }
      throw new BadRequestException(ErrorMessage.CreateUserError);
    }
  }

  async getAll(): Promise<UserEntity[]> {
    const user = await this.userRepository.find();
    return user;
  }

  async getById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }
}
