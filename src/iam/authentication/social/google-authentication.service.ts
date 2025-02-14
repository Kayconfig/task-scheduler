import {
  ConflictException,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import googleConfig from './config/google-config';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    @Inject(googleConfig.KEY)
    private readonly googleConfiguration: ConfigType<typeof googleConfig>,
    private readonly userService: UserService,
    private readonly authService: AuthenticationService,
  ) {}

  onModuleInit() {
    this.oauthClient = new OAuth2Client({
      clientId: this.googleConfiguration.clientId,
      clientSecret: this.googleConfiguration.clientSecret,
    });
  }
  async authenticate(token: string) {
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: token,
      });
      const payload = loginTicket.getPayload();
      if (!payload) {
        throw new UnauthorizedException();
      }
      const { email, sub: googleId, name } = payload;
      const user = await this.userService.findByEmail(email);

      if (user) {
        if (!user.googleId) {
          await this.userService.updateUser(
            { googleId: user.googleId },
            user.id,
          );
        }
        return this.authService.generateTokens(user);
      }

      // save new user
      const newUser = await this.userService.createGoogleUser({
        email,
        name,
        googleId,
      });
      return this.authService.generateTokens(newUser);
    } catch (err) {
      const pgUniqueViolationErrCode = '23505';
      if (err.code == pgUniqueViolationErrCode) {
        throw new ConflictException();
      }
      throw new UnauthorizedException();
    }
  }
}
