import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { users, UsersSchema } from './users/users.schema';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot('mongodb://localhost/trade'), MongooseModule.forFeature([{ name: users.name, schema: UsersSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
