import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';

@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([{
      name: Message.name,
      schema: MessageSchema  
  }])
  ],
  providers: [MessagesGateway, MessagesService,JwtStrategy,LocalStrategy],
})
export class MessagesModule {}
