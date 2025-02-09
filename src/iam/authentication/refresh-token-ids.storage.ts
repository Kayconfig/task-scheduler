import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { InvalidatedRefreshTokenError } from './errors/invalidated-refresh-token-error';

@Injectable()
export class RefreshTokenIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(private readonly redisService: RedisService) {}

  async onApplicationBootstrap() {
    await this.redisService.connect();
  }
  async onApplicationShutdown(signal?: string) {
    await this.redisService.disconnect();
  }

  async insert(userId: string, tokenId: string): Promise<void> {
    await this.redisService.set(this.getKey(userId), tokenId);
  }
  async validate(userId: string, tokenId: string): Promise<boolean> {
    const storedId = await this.redisService.get(this.getKey(userId));
    if (storedId !== tokenId) {
      throw new InvalidatedRefreshTokenError();
    }

    return true;
  }
  async invalidate(userId: string): Promise<void> {
    await this.redisService.del(this.getKey(userId));
  }

  private getKey(userId: string): string {
    return `user-refresh-token-${userId}`;
  }
}
