import DataStore from '../storage/DataStore';
import APIMappings, { expirations, APIName } from './APIMappings';
import fetch from 'node-fetch';
import Logger from './Logger';

export default class CachedAPIRequest {
    private static readonly LOGGER: Logger = new Logger(CachedAPIRequest);
    
    private readonly API_NAME:   APIName;
    private readonly IDENTIFIER: string;
    
    private requestUuid: string;

    public constructor(name: APIName, identifier?: string) {
        this.API_NAME   = name;
        if (identifier)
            this.IDENTIFIER = identifier;
    }
    
    private static sanitize(link: string): string {
        let key;
        if (link.includes('openweathermap')) {
            key = 'appid';
        } else if (link.includes('transitchicago') || link.includes('ctabustracker')) {
            key = 'key';
        }
        return link.replace(new RegExp(`${key}=[0-9a-f]+?(?=&|$)`, 'm'), `${key}=REDACTED`);
    }
    
    public setRequestUUID(value?: string): void {
        if (value)
            this.requestUuid = value;
    }
    
    public async send(): Promise<string> {
        const dataStoreIdentifier = this.getDataStoreIdentifier();
        
        const cachedData = await DataStore.get(dataStoreIdentifier);
        if (cachedData !== null) {
            CachedAPIRequest.LOGGER.log(`${this.formatRequestUUID()}CACHE HIT ${dataStoreIdentifier}`);
            return cachedData;
        }
        
        const generator = APIMappings[this.API_NAME];
        const requestUri = generator(this.IDENTIFIER);
        const sanitizedRequestUri = CachedAPIRequest.sanitize(requestUri);
        
        const rawResponse = await fetch(requestUri);
        const rawData: string = await rawResponse.text();
        
        CachedAPIRequest.LOGGER.warn(`${this.formatRequestUUID()}CACHE MISS ${dataStoreIdentifier} EXTERNAL ${sanitizedRequestUri}`);
        
        await DataStore.set(dataStoreIdentifier,    rawData);
        await DataStore.expire(dataStoreIdentifier, expirations[this.API_NAME]);
        
        return rawData;
    }
    
    private formatRequestUUID(): string {
        return this.requestUuid ? `[${this.requestUuid}] ` : '';
    }
    
    private getDataStoreIdentifier(): string {
        if (this.IDENTIFIER) {
            return `${this.API_NAME}_${this.IDENTIFIER}`;
        } else {
            return this.API_NAME;
        }
    }
}