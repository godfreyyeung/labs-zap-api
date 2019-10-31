import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

function proceedNoAuth(res, next) {
  res.clearCookie('token');
  next();
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: any, res: any, next: () => void) {
    req.session = false;

    const { token } = req.cookies;

    // this should happen in the service
    if (!token) {
      return proceedNoAuth(res, next);
    }

    try {
      req.session = await this.authService.validateCRMToken(token);
      next();
    } catch (e) {
      console.log(e);
      proceedNoAuth(res, next);
    }
  }
}
