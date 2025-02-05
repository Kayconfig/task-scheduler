import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signup(input: SignUpDto): Promise<SignUpResponseDto> {
    const password = await this.hashingService.hash(input.password);
    return SignUpResponseDto.create(
      await this.userService.createUser({ ...input, password }),
    );
  }

  async signin(input: SignInDto): Promise<string> {
    const INVALID_EMAIL_OR_PASSWRD_ERR_MSG = 'Invalid username or password';
    try {
      const user = await this.userService.findByEmail(input.email);
      const passwordIsCorrect = await this.hashingService.compare(
        input.password,
        user.password,
      );
      if (!passwordIsCorrect) {
        throw new UnauthorizedException(INVALID_EMAIL_OR_PASSWRD_ERR_MSG);
      }

      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
          // audience: this.jwtConfiguration.audience,
          // issuer: this.jwtConfiguration.issuer
        },
      );
      return accessToken;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException(INVALID_EMAIL_OR_PASSWRD_ERR_MSG);
      }
      throw err;
    }
  }
}
