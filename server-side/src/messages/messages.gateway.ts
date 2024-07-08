import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

import {Server, Socket} from 'socket.io'
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from 'src/auth/dto/update-auth.dto';

@WebSocketGateway({
  cors:{
    origin: '*',
  },
})
export class MessagesGateway {

  

  @WebSocketServer()
  server: Server;
  constructor(private readonly messagesService: MessagesService,
              private readonly authService: AuthService
  ) {}


  private onlineUsers: string[] = [];

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto , @ConnectedSocket() client: Socket) {

    console.log(createMessageDto);
    
    const message = await  this.messagesService.create(createMessageDto,client.id);

    const allUsers = await this.authService.getAllUsersNormal();

    const offlineUsers = allUsers.filter(user => !this.onlineUsers.some(onlineUser => onlineUser === user.name));

    for(var i = 0 ; i < offlineUsers.length ; i++){

      offlineUsers[i].notiList.push(message);
      var userAuth = new UpdateUserDto();
      userAuth.notiList = offlineUsers[i].notiList;
      var dummy = await this.authService.updateNotificationList(offlineUsers[i].id , userAuth )
    }
    
    
    return message
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('logout')
  handleDisconnect(@MessageBody('name') name:string,@ConnectedSocket() client: Socket ) {
    
    console.log(name);
    
    
    this.onlineUsers = this.onlineUsers.filter(user => user !== name);
    this.server.emit('onlineUsers', this.onlineUsers);
  }

  @SubscribeMessage('join')
  joinRoom(@MessageBody('name') name:string, @ConnectedSocket() client: Socket){
    
    if (!this.onlineUsers.includes(name)) {
      this.onlineUsers.push(name);
      this.server.emit('onlineUsers', this.onlineUsers);
    }
      return this.messagesService.identify(name,client.id);

  }

  @SubscribeMessage('typing')
  async typing(@MessageBody('isTyping') isTyping: boolean,
              @ConnectedSocket() client: Socket){
    
      const name = await this.messagesService.getClientByName(client.id);

      client.broadcast.emit('typing', {name , isTyping});

  }
}
