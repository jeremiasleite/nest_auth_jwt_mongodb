import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private readonly jwtService: JwtService,
      ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUserName(username);
    if (user && user.password === pass) { 
      return user;
    }
    return null;
  }

  async login(user: User) {    
    const payload = { username: user.username, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload), userId: user._id, username: user.username
    };
  }
}
