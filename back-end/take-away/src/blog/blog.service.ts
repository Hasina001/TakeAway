import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from './blog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
    blogService: any;
    constructor(
        @InjectModel (Blog.name)
        private blogModel: Model<Blog>,
    ) {}

    // Methode de creation
    async create(createBlogDto: CreateBlogDto): Promise<Blog> {

        const blog = new this.blogModel(createBlogDto); //crée une instance du modele

        return blog.save(); //sauvegarde dans MongoDB
    }

    // Methode pour récupére tous les blogs 
    async findAll(): Promise<Blog[]> {
        return this.blogModel.find().exec();

    }

    //Methode pour recuperer un seul blog
    async findOne( id: string): Promise<Blog> {
        const blog = await this.blogModel.findById(id).exec();
        if (!blog) {
            throw new NotFoundException(`Blog with Id ${id} not found`)
        }

        return blog;
    }

    // Mise à jour d'un blog
    async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        const UpdateBlog =  await this.blogModel.findByIdAndUpdate(id, updateBlogDto, {new: true}).exec();
        if (!UpdateBlog) {
            throw new NotFoundException(`Blog not found`)
        }

        return UpdateBlog;

    }

    // Supression d'un blog
    async remove(id: string): Promise<Blog> {
        const DeletedBlog = await this.blogModel.findByIdAndDelete(id).exec();
        if (!DeletedBlog) {
            throw new NotFoundException(`Blog not found`)
        }

        return DeletedBlog;
    }

}
