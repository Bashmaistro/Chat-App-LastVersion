import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { AuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto : CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  async checkLogin(@Body() authDto : AuthDto){
    console.log(authDto);
    
    const token = await this.authService.validateUser(authDto)
    const user = await this.authService.findByEmail(authDto.email)

    if(token){
      const respond = { token:token,
        user:user,
        success:true,

      };

      console.log(respond);
      
      return  respond
    }else{
      return {success: false}
    }

      
  }

  @Post('register')
  async register(@Body() createUserDto : CreateUserDto){

    const user 
  }

  
}
