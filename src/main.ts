import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes globales para validaciones DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignora campos no definidos en DTO
      forbidNonWhitelisted: true, // lanza error si se envian campos extra
      transform: true, // convierte tipos automáticamente (p.ej. id string -> number con ParseIntPipe)
    }),
  );

  // configuración de swagger
  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('API for managing tasks')
    .setVersion('1.0')
    .addBearerAuth() // habilita campo "Authorize" con token JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // define la ruta

  await app.listen(process.env.PORT ?? 3000);
  console.log(`App running on http://localhost:${process.env.PORT}`);
  console.log(`Swagger docs on http://localhost:${process.env.PORT}/api`);
}
bootstrap();


// SUBIR LOS COMMITS POR SEPARADO
// SUBIR LOS ARCHIVOS COMO DEBE SER