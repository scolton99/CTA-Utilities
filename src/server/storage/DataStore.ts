import MemoryDataStore from './MemoryDataStore';
import IDataStore from './IDataStore';
import RedisDataStore from './RedisDataStore';
import Logger from '../util/Logger';

const { DATA_STORE } = process.env;

const LOGGER: Logger = new Logger({ name: 'DataStore' });
let store: IDataStore | undefined;
    
export default ((): IDataStore => {
    if (!store) {
        switch (DATA_STORE) {
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
            default: {
                LOGGER.warn('No data cache specified - using memory cache');
                store = new MemoryDataStore();
                break;
            }
        }
    }
    
    return store;
})();
