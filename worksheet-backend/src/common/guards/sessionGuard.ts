import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SessionModel } from '../../sessions/session.model';

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(
        @InjectModel(SessionModel)
        private sessionModel: typeof SessionModel,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid Authorization header');
        }

        const token = authHeader.split(' ')[1];

        const session = await this.sessionModel.findOne({ where: { token } });

        if (!session) {
            throw new UnauthorizedException('Session expired or invalid');
        }

        request.session = session;

        return true;
    }
}