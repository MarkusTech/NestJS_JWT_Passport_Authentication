import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async verifyUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.getUser({ email });
      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        return new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Credentials are invalid');
    }
  }
}
