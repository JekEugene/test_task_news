import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, email } = data;

  const userDto: UserDto = {
    id,
    email,
  };

  return userDto;
};

export const toUserListDto = (data: UserEntity[]): UserDto[] => {
  return data.map(toUserDto);
};
