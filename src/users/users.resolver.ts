import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly userService: UsersService) {}

    @Query(() => [User])
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async users (){
        return this.userService.findAllUsers();
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    async me(@CurrentUser() user: User) {
        return user;
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async user(@Args('id', { type: () => ID }) id: string) {
        return this.userService.findUserById(id);
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard)
    async updateMe(
        @CurrentUser() user:User,
        @Args('input') input: UpdateUserInput,
    ) {
        return this.userService.updateUser(user.id, input);
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async updateUser(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdateUserInput,
    ) {
        return this.userService.updateUser(id, input);
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async deleteUser(@Args('id', { type: () => ID }) id: string) {
        return this.userService.deleteUser(id);
    } 
}
