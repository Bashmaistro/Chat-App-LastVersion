import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer';
import { Message } from 'src/messages/entities/message.entity';



  export class UpdateUserDto{

    
    @IsString()
    clientId?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Message)
    notiList?: Message[];
    

    
    }
