import { CacheService } from './cache.service';
import { Service } from 'typedi';
import Redis from 'ioredis';

@Service()
export class RaceLocker {
  private readonly TIMEOUT: number = 10000;
  private readonly RETRY_DELAY: number = 50;
  private readonly MAX_RETRIES: number = 2;
  private readonly KEY_PREFIX: string = 'race-lock';
  private readonly client: Redis;

  constructor(private readonly cacheService: CacheService) {
    this.client = cacheService.getClient();
  }

  private async getLock(key: string, timeout?: number): Promise<number> {
    const expiredAt: number = Date.now() + (timeout || this.TIMEOUT) + 1;
    const result = await this.client.set(
      key,
      expiredAt,
      'PX',
      this.TIMEOUT,
      'NX'
    );
    if (result) {
      return expiredAt;
    }

    let retry = 0;
    retry += 1;

    return new Promise((resolve: (expiredAt: number) => void) => {
      const retryTimeout = setTimeout(() => {
        if (retry < this.MAX_RETRIES) {
          this.getLock(key, timeout).then(resolve);
        }
        clearTimeout(retryTimeout);
      }, this.RETRY_DELAY);
    });
  }

  private lock(key: string, timeout?: number): Promise<any> {
    const lockKey = `${this.KEY_PREFIX}-${key}`;

    return new Promise((resolve: any, reject: any) => {
      this.getLock(lockKey, timeout)
        .then((expiredAt: number) => {
          resolve(async (): Promise<any> => {
            if (expiredAt > Date.now()) {
              return this.client.del(lockKey);
            }
            return Promise.resolve();
          });
        })
        .catch(reject);
    });
  }

  async lockAndExecute<T>(
    key: string,
    action: () => Promise<T>,
    timeout?: number
  ): Promise<T> {
    const unlock = await this.lock(key, timeout);
    try {
      return await action();
    } finally {
      await unlock();
    }
  }
}
