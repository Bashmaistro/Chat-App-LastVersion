import { isArray, IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer';
import { Message } from 'src/messages/entities/message.entity';



  export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;


    @IsString()
    clientId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Message)
    notiList: Message[];


    

    
    }
