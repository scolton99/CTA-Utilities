import { get as redis_get, set as redis_set, expire as redis_expire } from "./Redis";
import APIMappings, { expirations } from './APIMappings';
import fetch from "node-fetch";

export default class CachedAPIRequest {
    private readonly api_name: string;
    private readonly identifier: string;

    constructor(name: string, identifier?: string) {
        if (!APIMappings[name]) throw new Error("Unidentified API Mapping");

        this.api_name = name;
        this.identifier = identifier;
    }

    send = async (): Promise<string> => {
        const cached_data: string = await redis_get(`${this.api_name}_${this.identifier}`);
        if (cached_data !== null) {
            console.log(`Returning cached data. No external API hit for ${this.api_name}_${this.identifier}.`);
            return cached_data;
        }

        const generator = APIMappings[this.api_name];
        const request_uri = generator(this.identifier);

        const raw_res = await fetch(request_uri);
        const raw_data: string = await raw_res.text();

        console.log(`No cache (or cache expired) for ${this.api_name}_${this.identifier}. External API hit: ${request_uri}`);

        redis_set(`${this.api_name}_${this.identifier}`, raw_data).then();
        redis_expire(`${this.api_name}_${this.identifier}`, expirations[this.api_name]).then();

        return raw_data;
    };
}