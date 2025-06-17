import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // ignore les champs non attendus
    forbidNonWhitelisted: true, // erreur si champ inattendu
    transform: true, // transforme les types automatiquement
    })
  ); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
