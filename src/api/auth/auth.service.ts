import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { DefaultResponse } from '../../shared/dto/default-response.dto';
import { ErrorMessage } from '../../shared/enums/error-message.enum';
import { UserDto } from '../user/dto/user.dto';
import { ICreateUser } from '../user/interfaces/create-user.interface';
import { UserService } from '../user/user.service';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { IUserPayload } from './interfaces/user-payload.interface';
import { RefreshTokenRepository } from './refresh-token.repository';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepo: RefreshTokenRepository,
  ) {}

  async signUp({ email, password }: SignUpDto): Promise<DefaultResponse> {
    const isUserExist = await this.userService.findByEmail(email);

    if (isUserExist) {
      throw new ConflictException(ErrorMessage.UserAlreadyExist);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createUserData: ICreateUser = {
      email,
      password: hashedPassword,
    };

    await this.userService.create(createUserData);

    return { success: true };
  }

  async signIn({ email, password }: SignInDto): Promise<SignInResponseDto> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(ErrorMessage.InvalidCredentials);
    }

    const arePasswordsEqual = await this.comparePasswords(
      user.password,
      password,
    );

    if (!arePasswordsEqual) {
      throw new UnauthorizedException(ErrorMessage.InvalidCredentials);
    }

    const signInDto = await this.generateTokens({ email, id: user.id });
    return signInDto;
  }

  async logout(refreshToken: string): Promise<DefaultResponse> {
    const isDeleted = await this.refreshTokenRepo.delete(refreshToken);

    return { success: isDeleted };
  }

  private comparePasswords(
    userPassword: string,
    currentPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(currentPassword, userPassword);
  }

  private async generateTokens(user: UserDto): Promise<SignInResponseDto> {
    const [createdAccessToken, createdRefreshToken] = await Promise.all([
      this.createAccessToken(user),
      this.createRefreshToken(user.id),
    ]);

    return {
      accessToken: createdAccessToken,
      refreshToken: createdRefreshToken,
    };
  }

  private async createAccessToken({ id, email }: UserDto): Promise<string> {
    const expiresIn = this.configService.get<string>('ACCESS_TOKEN_EXPIRES');
    const secret = this.configService.get<string>('ACCESS_TOKEN_SECRET');

    const userPayload: IUserPayload = { email, id };
    const accessToken = await this.jwtService.signAsync(userPayload, {
      expiresIn,
      secret,
    });

    return accessToken;
  }

  private async createRefreshToken(userId: number): Promise<string> {
    const expiresIn = this.configService.get<string>('REFRESH_TOKEN_EXPIRES');
    const secret = this.configService.get<string>('REFRESH_TOKEN_SECRET');

    const refreshToken = await this.jwtService.signAsync(
      {},
      {
        expiresIn,
        secret,
      },
    );

    await this.refreshTokenRepo.create({ token: refreshToken, userId });

    return refreshToken;
  }

  validateAccessToken(token: string): IUserPayload | boolean {
    if (!token) {
      return false;
    }

    try {
      const result = this.jwtService.verify<IUserPayload>(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      });
      return result;
    } catch (error) {
      return false;
    }
  }
}
