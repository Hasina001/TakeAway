import { Field, InputType } from "@nestjs/graphql";
import { Role } from "@prisma/client";

@InputType()
export class CreateUserInput {
    @Field()
    email: string;

    @Field({ nullable: true })
    name?: string;

    @Field(() => Role, { nullable: true })
    role?: Role;

    @Field()
    password: string;
}