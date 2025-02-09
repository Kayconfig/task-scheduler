import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import redisConfig from './config/redis.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;
  constructor(
    @Inject(redisConfig.KEY)
    private readonly redisConfiguration: ConfigType<typeof redisConfig>,
  ) {
    this.redisClient = new Redis({
      host: this.redisConfiguration.redisHost,
      port: this.redisConfiguration.redisPort,
      lazyConnect: true,
    });
  }

  private async pingRedis(): Promise<string | null> {
    const pong = await this.redisClient?.ping();
    return pong ?? null;
  }

  async connect(): Promise<void> {
    const pong = await this.pingRedis();
    if (pong !== 'PONG') {
      await this.redisClient.connect();
    }
  }

  async disconnect(): Promise<void> {
    const pong = await this.pingRedis();
    if (pong === 'PONG') {
      await this.redisClient.quit();
    }
  }

  get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
