import redis from 'redis';
import { promisify } from 'util';
import IDataStore from './IDataStore';

export default class RedisDataStore implements IDataStore {
    private readonly REDIS_CLIENT = redis.createClient();
    
    public async get(key: string): Promise<string | null> {
        return await promisify(this.REDIS_CLIENT.get).call(this.REDIS_CLIENT, key);
    }
    
    public async set(key: string, value: string): Promise<void> {
        await promisify(this.REDIS_CLIENT.set).call(this.REDIS_CLIENT, key, value);
    }
    
    public async expire(key: string, expiration: number): Promise<void> {
        await promisify(this.REDIS_CLIENT.expire).call(this.REDIS_CLIENT, key, expiration);
    }
}
