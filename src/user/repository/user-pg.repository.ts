import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserPGRepository extends UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super();
  }
  findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }
  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }
  createUser(newUser: CreateUserDto): Promise<User> {
    return this.repository.save(this.repository.create(newUser));
  }
}
