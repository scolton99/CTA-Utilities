import IDataStore from './IDataStore';
import fetch from 'node-fetch';
import { serviceUri } from '../util/AppEngine';
import Logger from '../util/Logger';

export default class MemcacheDataStore implements IDataStore {
    private readonly SERVICE_URI: string = process.env.MEMCACHE_URL || serviceUri('cache');
    private readonly LOGGER: Logger = new Logger(MemcacheDataStore);
    
    public constructor() {
        this.LOGGER.warn(`Memcache service URI: ${this.SERVICE_URI}`);
    }
    
    public async expire(key: string, expiration: number): Promise<void> {
        const res = await fetch(`${this.SERVICE_URI}/expire`, {
            method: 'POST',
            body: JSON.stringify({ key, expiration })
        });
        
        if (res.status !== 200)
            throw new Error(`Error setting expiration in memcache: ${res.statusText}`);
    }
    
    public async get(key: string): Promise<string | null> {
        const reqBody = {
            method: 'POST',
            body: JSON.stringify({ key })
        };

        const res = await fetch(`${this.SERVICE_URI}/get`, reqBody);

        this.LOGGER.log(`MEMCACHE FETCH ${key} : ${res.status === 404 ? 'MISS' : 'HIT'} (${this.SERVICE_URI}/get ${JSON.stringify(reqBody)})`);
        
        if (res.status === 404)
            return null;
        
        const value = await res.text();
        
        if (res.status !== 200)
            throw new Error(`Error fetching from memcache: ${value}`);
        
        return value;
    }
    
    public async set(key: string, value: string): Promise<void> {
        const res = await fetch(`${this.SERVICE_URI}/set`, {
            method: 'POST',
            body: JSON.stringify({ key, value })
        });
        
        if (res.status !== 200)
            throw new Error(`Error setting in memcache: ${res.statusText}`);
    }
}