import { Message } from "../entities/message.entity";
import { IsArray, IsDate, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'

export class CreateMessageDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    @IsDateString()
    time: string;
}
