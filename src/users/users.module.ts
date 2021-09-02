import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AppController } from '../app.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { users, UsersSchema } from './users.schema';

@Module({
  imports: [forwardRef(() => AuthModule), MongooseModule.forFeature([{ name: users.name, schema: UsersSchema }])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [AppController],

})
export class UsersModule {}