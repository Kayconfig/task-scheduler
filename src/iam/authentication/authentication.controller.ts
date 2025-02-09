import {
  Body,
  Controller,
  NotFoundException,
  Post,
  SerializeOptions,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthenticationService } from './authentication.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { ConflictExceptionResponseDto } from './dto/conflict-exception-response.dto';
import { UnauthorizedExceptionResponseDto } from './dto/unauthorized-exception-response.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthTypes } from './enums/auth-types.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('authentication')
@Auth(AuthTypes.None)
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  @ApiCreatedResponse({
    type: SignUpResponseDto,
  })
  @ApiConflictResponse({
    type: ConflictExceptionResponseDto,
  })
  @SerializeOptions({ type: SignUpResponseDto })
  signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signup(signUpDto);
  }

  @Post('sign-in')
  @ApiOkResponse({
    type: SignInResponseDto,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedExceptionResponseDto,
  })
  @SerializeOptions({ type: SignInResponseDto })
  async signIn(
    @Body() signInDto: SignInDto,
    // @Res({ passthrough: true }) response: Response,
  ): Promise<SignInResponseDto> {
    try {
      const { accessToken, refreshToken } =
        await this.authService.signin(signInDto);
      //   response.cookie('accessToken', accessToken, {
      //     secure: true,
      //     httpOnly: true,
      //     sameSite: true, // disable by adding random text to the key of the cookie
      //   });
      return SignInResponseDto.create({ accessToken, refreshToken });
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException();
      }
    }
  }

  @ApiOkResponse({
    type: SignInResponseDto,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedExceptionResponseDto,
  })
  @Post('refresh-token')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
