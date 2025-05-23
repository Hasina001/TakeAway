import { InjectRepository } from "@nestjs/typeorm";
import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateEventDTo } from "./create-event.dto";
import { Event } from "./event.entity";
import { UpdateEventDto } from "./update-event.dto";
import { Like, MoreThan,Repository } from "typeorm";

@Controller('/events')
export class EventsController {
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>
    ){}

    @Get()
    async findAll() { 
        return await this.repository.find();
    }

    @Get('/practice')
    async practice() {
        return await this.repository.find({
            select: ['id', 'when'],
            where: [{ 
                id: MoreThan(3),
                when: MoreThan(new Date('2025-05-15T13:00:00'))
            }, {
                description: Like('%meet%')
            }],
            take: 2,
            order: {
                id: 'DESC'
            }
        })
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: any) {
        console.log(typeof id);
        const event = await this.repository.findOne(id);

        return event
    }

    @Post()
    async create(@Body(ValidationPipe) input: CreateEventDTo) {
        return await this.repository.save({
            ...input,
            when: new Date(input.when),
        });
        
    }

    @Patch(':id')
    async update(@Param('id') id: any, @Body() input: UpdateEventDto) {
        const event = await this.repository.findOne(id);
        if (!event) {
            // Optionnel : lever une exception plus claire
            throw new NotFoundException(`Event with id ${id} not found`);
        }

        return await this.repository.save({
            ...event,
            ...input,
            when: input.when? new Date(input.when): event.when
        })

        
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: any){
        const event = await this.repository.findOne(id);
        if (!event) {
            // Optionnel : lever une exception plus claire
            throw new NotFoundException(`Event with id ${id} not found`);
        }
        await this.repository.remove(event);

    }
}

// 1st step of input validation : npm i --save class-validation class-transformer