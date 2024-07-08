import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Message, MessageSchema } from "src/messages/entities/message.entity";



@Schema()
export class User {
    

    @Prop({ unique: true, required:true })
    name: string;
    
    @Prop({ unique: true, required:true })
    email: string;

    @Prop({ unique: false, required:true })
    password: string;

    @Prop({unique:true})
    clientId: string;

    @Prop({ type: [MessageSchema], default: [] ,unique:false})
     notiList: Message[];


}

export const UserSchema = SchemaFactory.createForClass(User);
