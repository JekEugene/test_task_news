import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
      return false;
    }

    const userPayload = this.authService.validateAccessToken(accessToken);

    if (!userPayload || typeof userPayload === 'boolean') {
      return false;
    }

    res.locals.userId = userPayload.id;
    return true;
  }
}
