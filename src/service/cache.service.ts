import { Service } from 'typedi';
import { Redis } from 'ioredis';
import { EnvConfigEnum } from '../enum/env-configuration.enum';
import { HttpStatusCode } from '../enum/http-status.enum';
import { CustomError } from '../helper/error.helper';

@Service()
export class CacheService {
  private client: Redis;

  constructor() {
    this.client = new Redis(process.env[EnvConfigEnum.REDIS_HOST])
      .on('error', (err) => console.error('Redis Client Error', err))
      .on('connect', () => {
        console.debug('Connected to redis server');
      });
  }

  getClient(): Redis {
    return this.client;
  }

  async set(key: string, value: any, ttl: number = 20) {
    return this.client.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async delete(key: string) {
    return this.client.del(key);
  }

  async get<T = any>(key: string): Promise<T> {
    return JSON.parse(await this.client.get(key));
  }

  async getOrThrowError(key: string) {
    const data = await this.client.get(key);
    if (!data) {
      throw new CustomError(
        HttpStatusCode.NOT_FOUND,
        `Redis failed to get value for key: ${key}`
      );
    }

    return JSON.parse(data);
  }

  async getOrLoad<T>(
    key: string,
    loader: (k?: string) => Promise<T>,
    ttl: number = 20
  ): Promise<T> {
    let data = await this.get<T>(key);

    if (!data) {
      data = await loader(key);
      this.set(key, data as Record<string, any>, ttl).catch();
    }

    return data;
  }
}
