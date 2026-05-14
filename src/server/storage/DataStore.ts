import MemoryDataStore from './MemoryDataStore.js';
import IDataStore from './IDataStore.js';
import RedisDataStore from './RedisDataStore.js';
import Logger from '../util/Logger.js';
import MemcacheDataStore from './MemcacheDataStore.js';

const { DATA_STORE } = process.env;

const LOGGER: Logger = new Logger({ name: 'DataStore' });
let store: IDataStore | undefined;
    
export default ((): IDataStore => {
    if (!store) {
        if (!DATA_STORE) {
            LOGGER.warn('No data cache specified - using memory cache');
            store = new MemoryDataStore();
        } else {
            switch (DATA_STORE.toUpperCase()) {
                case 'MEMORY': {
                    LOGGER.warn('Using in-memory data cache');
                    store = new MemoryDataStore();
                    break;
                }
                case 'REDIS': {
                    LOGGER.warn('Using Redis as data cache');
                    store = new RedisDataStore();
                    break;
                }
                case 'MEMCACHE': {
                    LOGGER.warn('Using memcache as data cache');
                    store = new MemcacheDataStore();
                    break;
                }
                default: {
                    LOGGER.warn('Invalid data cache specified - using memory cache');
                    store = new MemoryDataStore();
                    break;
                }
            }
        }
    }
    
    return store;
})();
