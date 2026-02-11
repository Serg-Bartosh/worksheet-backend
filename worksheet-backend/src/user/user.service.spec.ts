import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { SessionService } from '../sessions/session.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
    let service: UserService;
    let userModel: typeof UserModel;
    let sessionService: SessionService;

    const mockUserModel = {
        findOne: jest.fn(),
        create: jest.fn(),
    };

    const mockSessionService = {
        createSession: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(UserModel),
                    useValue: mockUserModel,
                },
                {
                    provide: SessionService,
                    useValue: mockSessionService,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userModel = module.get<typeof UserModel>(getModelToken(UserModel));
        sessionService = module.get<SessionService>(SessionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        const dto = { login: 'testuser', password: 'password123' };

        it('should throw BadRequestException if user already exists', async () => {
            mockUserModel.findOne.mockResolvedValue({ id: 1, login: dto.login });

            await expect(service.register(dto)).rejects.toThrow(BadRequestException);
            expect(mockUserModel.findOne).toHaveBeenCalledWith({ where: { login: dto.login } });
        });

        it('should create a user and return a token', async () => {
            mockUserModel.findOne.mockResolvedValue(null);
            mockUserModel.create.mockResolvedValue({ id: 1, login: dto.login });
            mockSessionService.createSession.mockResolvedValue({ token: 'fake-uuid-token' });

            const result = await service.register(dto);

            expect(result).toEqual({
                id: 1,
                login: dto.login,
                token: 'fake-uuid-token',
                message: 'User created successfully',
            });
            expect(mockUserModel.create).toHaveBeenCalled();
            expect(mockSessionService.createSession).toHaveBeenCalledWith(1);
        });
    });

    describe('login', () => {
        const dto = { login: 'testuser', password: 'password123' };

        it('should throw UnauthorizedException if user not found', async () => {
            mockUserModel.findOne.mockResolvedValue(null);

            await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
        });

        it('should throw UnauthorizedException if password does not match', async () => {
            const hashedPassword = await bcrypt.hash('different_password', 10);
            mockUserModel.findOne.mockResolvedValue({ id: 1, login: dto.login, passwordHash: hashedPassword });

            await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
        });

        it('should return a token if credentials are valid', async () => {
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            mockUserModel.findOne.mockResolvedValue({ id: 1, login: dto.login, passwordHash: hashedPassword });
            mockSessionService.createSession.mockResolvedValue({ token: 'new-session-token' });

            const result = await service.login(dto);

            expect(result.token).toBe('new-session-token');
            expect(mockSessionService.createSession).toHaveBeenCalledWith(1);
        });
    });
});