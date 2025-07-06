import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
    findByEmail(email: string) {
        throw new Error('Method not implemented.');
    }
    constructor(private prisma: PrismaService) {}

    async createUser(data: CreateUserInput): Promise<User> {
        const  hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });
    }

    async findUserById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async updateUser(id: string, data: UpdateUserInput): Promise<User> {
        const updateData: any = { ...data };

        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 10);
        }

        return this.prisma.user.update({
            where: { id },
            data: updateData,
        });
    }

    async deleteUser(id: string): Promise<User> {
        return this.prisma.user.delete({
            where: { id },
        });
    }

    async findAllUsers(): Promise<User []> {
        return this.prisma.user.findMany();
    }

    async createCartForUser(userId: string){
        return this.prisma.cart.create({
            data: {
                userId,
            },
        });
    }

}
