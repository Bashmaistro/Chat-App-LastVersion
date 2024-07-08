import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';



@Schema()
export class User {
    

    @Prop({ unique: true, required:true })
    name: string;
    
    @Prop({ unique: true, required:true })
    email: string;

    @Prop({ unique: true, required:true })
    password: string;

    @Prop({unique:true})
    clientId: string;



}

export const UserSchema = SchemaFactory.createForClass(User);
