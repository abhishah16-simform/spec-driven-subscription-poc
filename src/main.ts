import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
   const nestLogger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  nestLogger.log(`🚀 Environment dev`);
  nestLogger.log(`🚀 Application running on port 8000`);
  nestLogger.log(`🚀 Application running on port`);
  const config = new DocumentBuilder()
    .setTitle('Provider User Subscriptions API')
    .setDescription(
      'NestJS in-memory API for Company, User, and company-level Subscription management.',
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();

