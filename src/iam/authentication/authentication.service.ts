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
import { IActiveUser } from '../interfaces/active-user.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInResponseDataDto } from './dto/sign-in-response.dto';
import { UserDto } from './dto/user.dto';
import { randomUUID } from 'crypto';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { InvalidatedRefreshTokenError } from './errors/invalidated-refresh-token-error';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
  ) {}

  async signup(input: SignUpDto): Promise<SignUpResponseDto> {
    const password = await this.hashingService.hash(input.password);
    return SignUpResponseDto.create(
      await this.userService.createUser({ ...input, password }),
    );
  }

  async signin(input: SignInDto): Promise<SignInResponseDataDto> {
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
      return this.generateTokens(user);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException(INVALID_EMAIL_OR_PASSWRD_ERR_MSG);
      }
      throw err;
    }
  }

  async generateTokens(user: UserDto): Promise<SignInResponseDataDto> {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<IActiveUser>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email, role: user.role },
      ),

      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);

    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
    return { accessToken, refreshToken };
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<SignInResponseDataDto> {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<IActiveUser, 'sub'> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        // audience: this.jwtConfiguration.audience,
        // issuer: this.jwtConfiguration.issuer
      });

      const user = await this.userService.findById(sub);
      if (!user) {
        throw new Error('user not found');
      }

      const isValid = await this.refreshTokenIdsStorage.validate(
        user.id,
        refreshTokenId,
      );

      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.id);
      } else {
        throw new Error('Refresh token is not valid');
      }
      return this.generateTokens(user);
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError) {
        // take action: notify user that refresh token might have been stolen
        throw new UnauthorizedException('Access denied');
      }
      throw new UnauthorizedException();
    }
  }

  private async signToken<T>(userId: string, ttl: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        ...payload,
        sub: userId,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: ttl,
      },
    );
  }
}
