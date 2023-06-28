import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessage } from '../../shared/enums/error-message.enum';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { ICreateUser } from './interfaces/create-user.interface';
import { UserRepository } from './user.repository';
import { toUserDto, toUserListDto } from './utils/mapper';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepo.getAll();
    return toUserListDto(users);
  }

  async findById(id: number): Promise<UserDto> {
    const user = await this.userRepo.getById(id);
    if (!user) {
      throw new NotFoundException(ErrorMessage.UserNotFound);
    }
    return toUserDto(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepo.getByEmail(email);
    return user;
  }

  async create(createUserData: ICreateUser): Promise<UserDto> {
    const user = await this.userRepo.create(createUserData);
    return toUserDto(user);
  }
}
