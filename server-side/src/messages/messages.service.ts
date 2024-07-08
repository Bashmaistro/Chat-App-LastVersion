import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

import { Message } from './entities/message.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from 'src/auth/dto/update-auth.dto';
import { map } from 'rxjs';


@Injectable()
export class MessagesService {

  constructor(@InjectModel(Message.name) private messageModel: Model<Message> , private authService: AuthService){}

  
  async create(createMessageDto: CreateMessageDto , clientId: string) {


    createMessageDto.time = new Date().toISOString();
    const user = await this.authService.findByClientId(clientId);
    createMessageDto.name = user.name;
    const message = new this.messageModel(createMessageDto);
    const savedMessage = await message.save();

    
    

    

    console.log(createMessageDto);
    console.log(message);
    
    
    
    user.clientId = clientId;


    return savedMessage;

  

    // const message = {
    //   name: this.clientToUser[clientId],
    //   text: createMessageDto.text
    // }
    // this.messages.push(createMessageDto);

    // return message;
  }

  findAll() {
    return this.messageModel.find();
  }

  async identify(name: string , clientId: string){
    
    const user = await this.authService.findByUsername(name)

    const updatedDto = new UpdateUserDto;
    updatedDto.clientId = clientId;
    const updatedUser = await this.authService.updateClientId( updatedDto, user )

    
    
    return await this.authService.getAllUsers();
    
    // this.clientToUser[clientId] = name;

    // return Object.values(this.clientToUser);
  }

  async getClientByName(clientId: string){

    const user = await this.authService.findByClientId(clientId);
    
    
    return user.name;
  }


 

  
}
