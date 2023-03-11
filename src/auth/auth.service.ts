import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async validateToken(token: string): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const decoded = await this.jwtService.verifyAsync(token);
      return true;
    } catch (err) {
      return false;
    }
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      // const { password, ...result } = user;
      return user;
    }

    return null;
  }

  async generateToken(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      username,
      password: hashedPassword,
    });
    return createdUser.save();
  }
}
