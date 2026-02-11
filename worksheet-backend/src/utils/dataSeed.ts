import { WorksheetTaskModel } from '../worksheetTasks/worksheetTask.model';
import { TaskOptionModel } from '../taskOption/taskOption.model';

export const seedData = async () => {
    const taskCount = await WorksheetTaskModel.count();

    if (taskCount < 3) {
        console.log(`🌱There are ${taskCount} tasks in the database. I'm adding more to fill the list...`);

        const tasks = [
            {
                instruction: 'Which of the following is a noun?',
                options: [
                    { text: 'To run', isCorrect: false },
                    { text: 'Beautiful', isCorrect: false },
                    { text: 'Apple', isCorrect: true },
                    { text: 'Quickly', isCorrect: false },
                ],
            },
            {
                instruction: 'What is 5 multiplied by 6?',
                options: [
                    { text: '25', isCorrect: false },
                    { text: '30', isCorrect: true },
                    { text: '35', isCorrect: false },
                    { text: '40', isCorrect: false },
                ],
            },
            {
                instruction: 'What is the capital city of France?',
                options: [
                    { text: 'London', isCorrect: false },
                    { text: 'Berlin', isCorrect: false },
                    { text: 'Madrid', isCorrect: false },
                    { text: 'Paris', isCorrect: true },
                ],
            },
            {
                instruction: 'Which planet is known as the "Red Planet"?',
                options: [
                    { text: 'Venus', isCorrect: false },
                    { text: 'Jupiter', isCorrect: false },
                    { text: 'Mars', isCorrect: true },
                    { text: 'Saturn', isCorrect: false },
                ],
            }
        ];

        for (const t of tasks) {
            const [task, created] = await WorksheetTaskModel.findOrCreate({
                where: { instruction: t.instruction }
            });

            if (created) {
                const optionsWithTaskId = t.options.map(opt => ({
                    ...opt,
                    taskId: task.id,
                }));
                await TaskOptionModel.bulkCreate(optionsWithTaskId);
            }
        }

        console.log('✅ Seeding is complete. Now there are exactly 4 tasks in the database.');
    } else {
        console.log(`📢 Already in the database ${taskCount} tasks. I skip seeding.`);
    }
};