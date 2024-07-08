import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer';



  export class UpdateUserDto{

    
    @IsString()
    clientId?: string;

    

    
    }
