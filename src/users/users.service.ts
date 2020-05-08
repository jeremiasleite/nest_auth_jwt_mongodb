import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-userDto';
import { UpdateUserDto } from './dto/update-userDto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { hashSync } from 'bcrypt';
import { ResponseUserDto } from './dto/response-userDto';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const hash = hashSync(createUserDto.password, 10);
    createUserDto.password = hash;
    const createdUser = new this.userModel(createUserDto);
    try {
      const resut = await createdUser.save();
      return new ResponseUserDto(resut._id, resut.username, resut.email, resut.isActive, resut.createdAt);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const list = await this.userModel.find().select('_id username email isActive createdAt').exec();
      return list as User[];
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const usuario = this.userModel.findOne({ _id: id }).select('_id username email isActive createdAt').exec();
      if (!(await usuario)) {
        throw new NotFoundException("Usuário não encontrado.")
      }
      return usuario
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.userModel.deleteOne({ _id: id });
      if (result.deletedCount == 0)
        throw new NotFoundException("Usuário não encontrado.")
      return { menssage: "User removido." };
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }

  async findOneUserName(username: string): Promise<User> {
    try {
      const usuario = await this.userModel.findOne({ username: username }).exec();
      if (!(await usuario)) {
        throw new NotFoundException("Usuário não encontrado.")
      }
      return usuario as User;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }

  async update(usuario: UpdateUserDto): Promise<User> {
    const usuarioToUpdate = await this.findOne(usuario._id);
    const email = usuario.email ? usuario.email : usuarioToUpdate.email;
    const username = usuario.username ? usuario.username : usuarioToUpdate.username;
    try {
      const result = await this.userModel.updateOne({ _id: usuario._id }, { username: username, email: email });
      return result.nModified;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }
}
