import IDataStore from './IDataStore';
import fetch from 'node-fetch';
import { serviceUri } from '../util/AppEngine';

export default class MemcacheDataStore implements IDataStore {
    private readonly SERVICE_URI: string = serviceUri('cache');
    
    public async expire(key: string, expiration: number): Promise<void> {
        const res = await fetch(this.SERVICE_URI, {
            method: 'POST',
            body: JSON.stringify({ key, expiration })
        });
        
        if (res.status !== 200)
            throw new Error(`Error setting expiration in memcache: ${res.statusText}`);
    }
    
    public async get(key: string): Promise<string | null> {
        const res = await fetch(this.SERVICE_URI, {
            method: 'POST',
            body: JSON.stringify({ key })
        });
        
        if (res.status === 404)
            return null;
        
        const value = await res.text();
        
        if (res.status !== 200)
            throw new Error(`Error fetching from memcache: ${value}`);
        
        return value;
    }
    
    public async set(key: string, value: string): Promise<void> {
        const res = await fetch(this.SERVICE_URI, {
            method: 'POST',
            body: JSON.stringify({ key, value })
        });
        
        if (res.status !== 200)
            throw new Error(`Error setting in memcache: ${res.statusText}`);
    }
}