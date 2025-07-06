import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver, {
    provide: JwtStrategy,
    useFactory: (authService: AuthService, configService: ConfigService) => {
      return new JwtStrategy(authService, configService);
    },
    inject: [AuthService, ConfigService],
  },
],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
