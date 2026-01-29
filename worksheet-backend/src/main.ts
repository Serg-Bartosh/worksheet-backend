import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedData } from './utiles/dataSeed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await seedData();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
