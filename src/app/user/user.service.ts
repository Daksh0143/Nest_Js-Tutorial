import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel:Model<UserDocument>,
  ){}


  async create(createUserInput: CreateUserInput) {
    const createUser=await this.userModel.create(createUserInput)
    return createUser;
  }

  async findAll() {
    const data=await this.userModel.find()
    return data;
  }

  async findOne(_id: MongooseSchema.Types.ObjectId) {
    const data=await this.userModel.findById({_id})
    return data;
  }

  async update(id: MongooseSchema.Types.ObjectId, updateUserInput: UpdateUserInput) {
    const updatedData=await this.userModel.findByIdAndUpdate(id,updateUserInput,{new:true})
    return updatedData;
  }

  async remove(id: MongooseSchema.Types.ObjectId) {
    const removeData=await this.userModel.findByIdAndDelete({id})
    return removeData;
  }
}
