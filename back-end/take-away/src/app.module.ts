import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './event.controller';
import { Event } from './event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //install TypeOrm : npm i --save @nestjs/typeorm typeorm mysql
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'example',
    database: 'nest-events',
    entities: [Event],
    synchronize: true
  }),
TypeOrmModule.forFeature([Event])],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}


//