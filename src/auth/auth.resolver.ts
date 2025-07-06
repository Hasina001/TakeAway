import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthPayload } from './models/auth.payload';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AuthPayload)
    async login(@Args('input') input: LoginInput) {
        const user = await this.authService.validateUser(input.email, input.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Mutation(() => AuthPayload)
    async register(@Args('input') input: RegisterInput) {
        return this.authService.register(input);
    }
}
