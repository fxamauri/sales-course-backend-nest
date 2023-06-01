import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './interface/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = 10;
    const passwordhash = await hash(createUserDto.password, salt);

    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      password: passwordhash,
    };

    this.users.push(user);

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}
