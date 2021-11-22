import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/modules/backoffice/service/account.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './../interfaces/jwt-payload.interface';

//npm install --save @nestjs/jwt passport-jwt

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService
  ) {}

  async createToken() {
    const user: JwtPayload = { username: 'test@email.com' };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken
    };
  }
}
