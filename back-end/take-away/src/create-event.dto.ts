import { IsDateString, IsString, Length } from "class-validator";

export class CreateEventDTo{
    @IsString()
    @Length(5, 255, {message: 'the name length is wrong'}) // must import Length from class-validator 
    name: string;

    @Length(5, 255)
    description: string;

    @IsDateString()
    when: string;

    @Length(5, 255)
    address: string;
}