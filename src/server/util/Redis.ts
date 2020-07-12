// import redis from "redis";
// import { promisify } from "util";
//
// const redis_client = redis.createClient();
//
// export const get = promisify(redis_client.get).bind(redis_client);
// export const set = promisify(redis_client.set).bind(redis_client);
// export const expire = promisify(redis_client.expire).bind(redis_client);

const store: { [key: string]: string } = {};

const expirations: { [key: string]: number } = {};

export const get = async (key: string): Promise<string> => {
    if (!store[key]) return null;

    const time = Date.now();
    if (expirations[key] && expirations[key] > time) {
        return store[key];
    } else {
        return null;
    }
};

export const set = async (key: string, value: string): Promise<void> => {
    store[key] = value;
};

export const expire = async (key: string, seconds: number): Promise<void> => {
    expirations[key] = Date.now() + 1000 * seconds;
};