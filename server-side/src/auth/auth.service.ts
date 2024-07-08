import { Injectable } from '@nestjs/common';
import { CreateUserDto} from './dto/create-auth.dto';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/auth.entity';
import { Model } from 'mongoose';
import {JwtService} from '@nestjs/jwt'
import { UpdateUserDto } from './dto/update-auth.dto';


@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private authModel: Model<User>,private jwtService: JwtService ){}
  
  create(createUserDto: CreateUserDto) {

    
    return this.authModel.create(createUserDto);
  }

  async validateUser(authPayloadDto : AuthDto){

    const findUser = await this.authModel.findOne({email: authPayloadDto.email})

    if (findUser && (findUser.password === authPayloadDto.password)) {
        
        const {password, ...user } = findUser;
        return this.jwtService.sign(user);

    }else{
        return false;
    }}


   async findByUsername(name: string){
    const findUser = await this.authModel.findOne({name: name})
    return findUser;
   } 

   async updateClientId(UpdateUserDto : UpdateUserDto , user){



    const updatedUser = await this.authModel.findByIdAndUpdate(user._id , UpdateUserDto , {new:true})

    return updatedUser;

   }

   async findByEmail(email:string){
    const user = await this.authModel.findOne({email:email})
    return user
   }

   async getAllUsers(){
    const users = await this.authModel.find();
    return users.map(user => ({ name: user.name, clientId: user.clientId }));
  }

  async findByClientId(clientId : string){
    const user = await this.authModel.findOne({clientId: clientId})
    return user;
  }
}
