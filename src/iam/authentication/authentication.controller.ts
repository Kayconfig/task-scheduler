import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Res,
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
import { Response } from 'express';
import { Public } from './decorators/is-public.metadata';
import { Auth } from './decorators/auth.decorator';
import { AuthTypes } from './enums/auth-types.enum';

@Controller('authentication')
@Auth(AuthTypes.None)
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  @Public()
  @ApiCreatedResponse({
    type: SignUpResponseDto,
  })
  @ApiConflictResponse({
    type: ConflictExceptionResponseDto,
  })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('sign-in')
  @ApiOkResponse({
    type: SignInResponseDto,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedExceptionResponseDto,
  })
  @Public()
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SignInResponseDto> {
    try {
      const accessToken = await this.authService.signin(signInDto);
      response.cookie('accessToken', accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: true,
      });
      return SignInResponseDto.create();
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException();
      }
    }
  }
}
