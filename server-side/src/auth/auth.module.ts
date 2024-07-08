import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/auth.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [JwtModule.register({
    secret: 'secretkey',
    signOptions: {expiresIn: '24h'},
  }),
  MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema

}])],
  controllers: [AuthController],
  providers: [AuthService , LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
