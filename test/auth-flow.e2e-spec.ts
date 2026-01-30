import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth & Tasks Flow (e2e)', () => {
  let app: INestApplication;
  let userToken: string;
  const testUser = {
    login: `user_${Date.now()}`,
    password: 'testPassword123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user/create-user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user/create-user')
      .send(testUser)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('token');
        userToken = res.body.token;
      });
  });

  it('/worksheet-tasks/tasks (GET) - Unauthorized', () => {
    return request(app.getHttpServer())
      .get('/worksheet-tasks/tasks')
      .expect(401);
  });

  it('/worksheet-tasks/tasks (GET) - Success', () => {
    return request(app.getHttpServer())
      .get('/worksheet-tasks/tasks')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/worksheet-tasks/answer/:id (POST)', async () => {
    const tasksRes = await request(app.getHttpServer())
      .get('/worksheet-tasks/tasks')
      .set('Authorization', `Bearer ${userToken}`);

    const taskId = tasksRes.body[0].id;
    const optionId = tasksRes.body[0].options[0].id;

    return request(app.getHttpServer())
      .post(`/worksheet-tasks/answer/${taskId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ option_id: optionId })
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('isCorrect');
        expect(res.body).toHaveProperty('result');
      });
  });
});