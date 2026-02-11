import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from './session.service';
import { getModelToken } from '@nestjs/sequelize';
import { SessionModel } from './session.model';
import { ConfigService } from '@nestjs/config';

describe('SessionService', () => {
    let service: SessionService;
    let model: typeof SessionModel;

    const mockSessionModel = {
        create: jest.fn(),
        findOne: jest.fn(),
    };

    const mockConfigService = {
        getOrThrow: jest.fn().mockReturnValue('some-secret-key'),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SessionService,
                {
                    provide: getModelToken(SessionModel),
                    useValue: mockSessionModel,
                },
                {
                    provide: ConfigService,
                    useValue: mockConfigService,
                },
            ],
        }).compile();

        service = module.get<SessionService>(SessionService);
        model = module.get<typeof SessionModel>(getModelToken(SessionModel));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createSession', () => {
        it('should generate a raw token and save its hash to the DB', async () => {
            const userId = 1;
            mockSessionModel.create.mockResolvedValue({ id: 10, userId });

            const result = await service.createSession(userId);


            expect(result.token).toBeDefined();
            expect(result.token.length).toBe(36);

            const createArgs = mockSessionModel.create.mock.calls[0][0];
            expect(createArgs.token).not.toBe(result.token);
            expect(createArgs.token.length).toBe(64);
            expect(createArgs.userId).toBe(userId);
            expect(createArgs.expiresAt).toBeInstanceOf(Date);
        });
    });

    describe('validateAndGetSession', () => {
        it('should return session if token is valid and not expired', async () => {
            const rawToken = 'real-token-123';
            const futureDate = new Date();
            futureDate.setHours(futureDate.getHours() + 1);

            const mockSession = {
                token: 'hashed-version',
                expiresAt: futureDate,
            };

            mockSessionModel.findOne.mockResolvedValue(mockSession);

            const result = await service.validateAndGetSession(rawToken);

            expect(result).toEqual(mockSession);
            expect(mockSessionModel.findOne).toHaveBeenCalled();
        });

        it('should return null and destroy session if it is expired', async () => {
            const rawToken = 'expired-token';
            const pastDate = new Date();
            pastDate.setHours(pastDate.getHours() - 1);

            const mockSession = {
                token: 'hashed-version',
                expiresAt: pastDate,
                destroy: jest.fn().mockResolvedValue(true),
            };

            mockSessionModel.findOne.mockResolvedValue(mockSession);

            const result = await service.validateAndGetSession(rawToken);

            expect(result).toBeNull();
            expect(mockSession.destroy).toHaveBeenCalled();
        });

        it('should return null if session is not found', async () => {
            mockSessionModel.findOne.mockResolvedValue(null);

            const result = await service.validateAndGetSession('wrong-token');

            expect(result).toBeNull();
        });
    });
});