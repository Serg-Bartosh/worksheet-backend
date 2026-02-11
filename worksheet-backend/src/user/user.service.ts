import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/createUserDto';
import { SessionService } from '../sessions/session.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    private sessionService: SessionService,
  ) { }

  async register(dto: CreateUserDto) {
    const candidate = await this.userModel.findOne({ where: { login: dto.login } });
    if (candidate) {
      throw new BadRequestException('User with this login already exists');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      login: dto.login,
      passwordHash: hash,
    });

    const { token } = await this.sessionService.createSession(user.id);

    return {
      id: user.id,
      login: user.login,
      token,
      message: 'User created successfully'
    };
  }

  async login(dto: CreateUserDto) {
    const user = await this.userModel.findOne({ where: { login: dto.login } });

    if (!user) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const { token } = await this.sessionService.createSession(user.id);

    return {
      id: user.id,
      login: user.login,
      token,
      message: 'Logged in successfully'
    };
  }
}