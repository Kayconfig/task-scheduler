import { Body, Controller, Post } from '@nestjs/common';
import { GoogleTokenDto } from './dto/google-token.dto';
import { GoogleAuthenticationService } from './google-authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { AuthTypes } from '../enums/auth-types.enum';

@Controller('authentication/google')
@ApiTags('Authentication')
@Auth(AuthTypes.None)
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthService: GoogleAuthenticationService,
  ) {}
  @Post()
  authenticate(@Body() dto: GoogleTokenDto) {
    return this.googleAuthService.authenticate(dto.token);
  }
}
