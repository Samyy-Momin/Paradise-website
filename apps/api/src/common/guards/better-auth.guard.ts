import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { auth } from '../../auth/auth';

@Injectable()
export class BetterAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || !session.user) {
      throw new UnauthorizedException('Invalid or expired session');
    }
    request.user = session.user;
    return true;
  }
}
