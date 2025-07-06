import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterInput } from './dto/register.input';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser (email: string, password:string): Promise<User | null> {
        const user = await this.usersService.findUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }

    async register(input: RegisterInput) {
        const existingUser: any = await this.usersService.findByEmail(input.email);
        if (existingUser) {
            throw new UnauthorizedException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);
        const user = await this.usersService.createUser({
            ...input,
            password: hashedPassword,
        });

        return this.login(user);

    }

    async validateUserById(userId: string): Promise<User | null> {
        return this.usersService.findUserById(userId)
    }
}
