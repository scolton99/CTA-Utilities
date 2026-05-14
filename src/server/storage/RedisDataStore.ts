import redis from 'redis';
import IDataStore from './IDataStore.js';

export default class RedisDataStore implements IDataStore {
    private readonly REDIS_CLIENT = redis.createClient();
    
    public async get(key: redis.RedisArgument): Promise<string | null> {
        return await this.REDIS_CLIENT.get(key);
    }
    
    public async set(key: string, value: string): Promise<void> {
        await this.REDIS_CLIENT.set(key, value);
    }
    
    public async expire(key: string, expiration: number): Promise<void> {
        await this.REDIS_CLIENT.expire(key, expiration);
    }
}
