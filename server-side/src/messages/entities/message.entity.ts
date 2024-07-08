import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Message {

    @Prop( {required:true })
    name: string;
    
    @Prop({required:true })
    text: string;

    @Prop({ required:true })
    time: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);