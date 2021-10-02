import IDataStore from './IDataStore';
import Logger from '../util/Logger';

interface MemoryDataStoreRecord {
  value: string,
  expiration?: number
}

export default class MemoryDataStore implements IDataStore {
  private static readonly LOGGER: Logger = new Logger(MemoryDataStore);
  private store: Record<string, MemoryDataStoreRecord | null> = {};

  public async get(key: string): Promise<string | null> {
      const cached = this.store[key];
    
      if (!cached)
          return null;
    
      const { value, expiration } = cached;
    
      const time = Date.now();
      if (expiration && expiration > time) {
          return value;
      } else {
          delete this.store[key];
          return null;
      }
  }
  
  public async set(key: string, value: string): Promise<void> {
      this.store[key] = { value };
  }
  
  public async expire(key: string, seconds: number): Promise<void> {
      const cached = this.store[key];
    
      if (!cached) {
          MemoryDataStore.LOGGER.warn(`Tried invalidating non-existent key: ${key}`);
          return;
      }
    
      cached.expiration = Date.now() + 1000 * seconds;
  }
}
