import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UsersDocument = users & Document;

@Schema()
export class users  extends mongoose.Document{
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  role: string;
}

export const UsersSchema = SchemaFactory.createForClass(users);