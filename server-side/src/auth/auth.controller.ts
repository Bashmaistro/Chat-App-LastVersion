import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './Guard/jwt.guard';
import { UpdateUserDto } from './dto/update-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  

  @Post('login')
  async checkLogin(@Body() authDto : AuthDto){
    
    
    const token = await this.authService.validateUser(authDto)
    const user = await this.authService.findByEmail(authDto.email)

    if(token){
      const respond = { token:token,
        user:user,
        success:true,

      };

      
      
      return  respond
    }else{
      return {success: false}
    }

      
  }

  @Post('register')
  async create(@Body() createAuthDto: CreateUserDto) {

    var user = new AuthDto();
    user.email = createAuthDto.email;
    user.password = createAuthDto.password;

      var newUser = await this.authService.create(createAuthDto);

    

      const token = await this.authService.validateUser(user);

      const userWithToken = {
        ...newUser,
        token: token,
        success: true
    };

      return userWithToken;
    }

  @Get('noti')
  @UseGuards(JwtAuthGuard)
  async getNotiList(@Req() req:any){

  
    
    const user = await this.authService.findByUsername(req.user.name);
    
    

    const list = user.notiList;

    if(user.notiList == null ){
      return {notiList : []}
    }
    const updatedDto = new UpdateUserDto();
    updatedDto.notiList = [];

    const dummy = this.authService.updateNotificationList(user.id , updatedDto);

    return {notiList: list};

  }

  

  
}
