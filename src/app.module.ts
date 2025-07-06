import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      context: ({ req, res }) => ({ req, res }),
      playground: true,
      introspection: true,
    }),
    AuthModule,
    UsersModule,
  ],
=======

@Module({
  imports: [],
>>>>>>> 541263d03452802ebcd7b4fbab46564d901ad791
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
