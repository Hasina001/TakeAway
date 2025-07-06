import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RegisterInput {
    @Field()
    email: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    password: string;
}