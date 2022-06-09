import { Inject } from '@midwayjs/decorator';
import { RedisServiceFactory } from '@midwayjs/redis';
import { Redis } from 'ioredis';

export class BaseService {
  @Inject()
  redisServiceFactory: RedisServiceFactory;

  getRedis(): Redis {
    return this.redisServiceFactory.get();
  }
}
