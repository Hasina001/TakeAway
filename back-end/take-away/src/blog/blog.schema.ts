import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ timestamps: true })
export class Blog extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    views: number;

    @Prop()
    author: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog)