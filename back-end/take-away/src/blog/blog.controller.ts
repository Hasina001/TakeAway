import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog') // Toutes les routes commenceront par /blog
export class BlogController {
    constructor (
        private readonly blogService: BlogService
        ) {}

        @Post()
        async create(@Body() dto: CreateBlogDto) {
            return this.blogService.create(dto);
        }

        @Get()
        async findAll() {
            return this.blogService.findAll();
        }

        @Get(':id')
        async findOne(@Param('id') id: string) {
            return this.blogService.findOne(id)
        }

        @Patch(':id')
        async update (@Param('id') id: string, @Body() dto: UpdateBlogDto) {
            return this.blogService.update(id, dto);
        }

        @Delete(':id')
        async remove(@Param('id') id: string) {
            return this.blogService.remove(id);
        }

}
