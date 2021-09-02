import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import {CreateUsers} from './dto/create-user.dto'
import { InjectModel } from '@nestjs/mongoose';
import { users, UsersDocument } from './users.schema';
import { Model } from 'mongoose';


export type User = any;

@Injectable()
export class UsersService {
  constructor(@Inject(forwardRef(() => AuthService))private authService: AuthService, @InjectModel(users.name) private userModel: Model<UsersDocument>

  ){}
  async create(createUserDto: CreateUsers): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById({_id: id});
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.find({username: username});
  }

}
