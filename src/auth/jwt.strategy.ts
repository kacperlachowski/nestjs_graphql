// import { Injectable } from '@nestjs/common';
// import { JwtService as NestJwtService } from '@nestjs/jwt';
// import { User } from '../users/entities/user.model';

// @Injectable()
// export class JwtStrategy {
//   constructor(private readonly jwtService: NestJwtService) {}

//   async signPayload(payload: { sub: string }) {
//     return this.jwtService.sign(payload);
//   }

//   async validatePayload(payload: { sub: string }) {
//     return { userId: payload.sub };
//   }

//   async generateToken(user: User) {
//     const payload = { sub: user.id.toString() };
//     return {
//       accessToken: await this.signPayload(payload),
//     };
//   }
// }
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../users/entities/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mysecretngsdfngsdngnsdl',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }

  async signPayload(payload: { sub: string }) {
    return this.jwtService.sign(payload);
  }

  async validatePayload(payload: { sub: string }) {
    return { userId: payload.sub };
  }

  async generateToken(user: User) {
    const payload = { sub: user.id.toString() };
    return {
      accessToken: await this.signPayload(payload),
    };
  }
}
