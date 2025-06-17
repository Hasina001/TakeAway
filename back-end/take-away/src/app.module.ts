import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';


@Module({
  imports: [
    // chargement du fichier .env
    ConfigModule.forRoot({
      isGlobal:true, // rend disponible partout sans avoir besoin de le reimporter
    }),

    //connexion à MongoDB avec la variable d'environnement
    MongooseModule.forRootAsync({
      useFactory: (configService:ConfigService) => ({
        uri:configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService]
    }),

    BlogModule
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}


//