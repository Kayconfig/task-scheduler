import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { UserPGRepository } from './repository/user-pg.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserPGRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
