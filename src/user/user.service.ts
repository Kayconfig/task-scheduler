import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { USER_EMAIL_ALREADY_EXIST_ERR_MSG } from './constants/error-msg';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  createUser(newUser: CreateUserDto): Promise<User> {
    try {
      return this.userRepo.createUser(newUser);
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException(USER_EMAIL_ALREADY_EXIST_ERR_MSG);
      }
      throw err;
    }
  }

  createGoogleUser(newUser: Omit<CreateUserDto, 'password'>): Promise<User> {
    try {
      return this.userRepo.createGoogleUser(newUser);
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException(USER_EMAIL_ALREADY_EXIST_ERR_MSG);
      }
      throw err;
    }
  }

  async updateUser(dto: UpdateUserDto, userId: string): Promise<User> {
    const updatedUser = await this.userRepo.updateUser(dto, userId);
    if (!updatedUser) throw new NotFoundException('user not found');

    return updatedUser;
  }
}
