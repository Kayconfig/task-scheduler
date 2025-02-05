import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract createUser(newUser: CreateUserDto): Promise<User>;
}
