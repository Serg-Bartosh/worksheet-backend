// guards/session.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { SessionService } from '../../sessions/session.service';

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private readonly sessionService: SessionService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid Authorization header');
        }
        const rawToken = authHeader.split(' ')[1];

        const session = await this.sessionService.validateAndGetSession(rawToken);

        if (!session) {
            throw new UnauthorizedException('Session not found or expired');
        }

        request.session = session;

        return true;
    }
}