import { Test, TestingModule } from '@nestjs/testing';
import { WorksheetTaskService } from './worksheetTask.service';
import { getModelToken } from '@nestjs/sequelize';
import { WorksheetTaskModel } from './worksheetTask.model';
import { TaskOptionModel } from '../taskOption/taskOption.model';
import { AnswerModel } from '../answers/answers.model';
import { BadRequestException } from '@nestjs/common';

describe('WorksheetTaskService', () => {
    let service: WorksheetTaskService;
    let taskModel: typeof WorksheetTaskModel;
    let optionModel: typeof TaskOptionModel;
    let answerModel: typeof AnswerModel;

    const mockTaskModel = {
        findAll: jest.fn(),
    };

    const mockOptionModel = {
        findOne: jest.fn(),
    };

    const mockAnswerModel = {
        upsert: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WorksheetTaskService,
                {
                    provide: getModelToken(WorksheetTaskModel),
                    useValue: mockTaskModel,
                },
                {
                    provide: getModelToken(TaskOptionModel),
                    useValue: mockOptionModel,
                },
                {
                    provide: getModelToken(AnswerModel),
                    useValue: mockAnswerModel,
                },
            ],
        }).compile();

        service = module.get<WorksheetTaskService>(WorksheetTaskService);
        taskModel = module.get<typeof WorksheetTaskModel>(getModelToken(WorksheetTaskModel));
        optionModel = module.get<typeof TaskOptionModel>(getModelToken(TaskOptionModel));
        answerModel = module.get<typeof AnswerModel>(getModelToken(AnswerModel));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAllTasks', () => {
        it('should return all tasks with options', async () => {
            const mockTasks = [
                { id: 1, instruction: 'Task 1', TaskOptionModels: [] },
            ];
            mockTaskModel.findAll.mockResolvedValue(mockTasks);

            const result = await service.findAllTasks();

            expect(result).toEqual(mockTasks);
            expect(mockTaskModel.findAll).toHaveBeenCalledWith({
                include: [TaskOptionModel],
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            });
        });
    });

    describe('checkAndSaveAnswer', () => {
        const taskId = 1;
        const optionId = 10;
        const sessionId = 99;

        it('should throw BadRequestException if option does not exist for task', async () => {
            mockOptionModel.findOne.mockResolvedValue(null);

            await expect(
                service.checkAndSaveAnswer(taskId, optionId, sessionId),
            ).rejects.toThrow(BadRequestException);
        });

        it('should return correct result and call upsert if option is valid (correct case)', async () => {
            const mockOption = { id: optionId, taskId: taskId, isCorrect: true };
            mockOptionModel.findOne.mockResolvedValue(mockOption);
            mockAnswerModel.upsert.mockResolvedValue([null, true]); // Sequelize upsert returns [instance, created]

            const result = await service.checkAndSaveAnswer(taskId, optionId, sessionId);

            expect(result).toEqual({
                isCorrect: true,
                result: 'good',
                message: 'Correct answer!',
            });
            expect(mockAnswerModel.upsert).toHaveBeenCalledWith({
                sessionId,
                taskId,
                optionId,
            });
        });

        it('should return wrong result if option is incorrect (wrong case)', async () => {
            const mockOption = { id: optionId, taskId: taskId, isCorrect: false };
            mockOptionModel.findOne.mockResolvedValue(mockOption);

            const result = await service.checkAndSaveAnswer(taskId, optionId, sessionId);

            expect(result).toEqual({
                isCorrect: false,
                result: 'wrong',
                message: 'Wrong answer, try again.',
            });
        });
    });
});