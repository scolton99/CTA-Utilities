import redis from "redis";
import { promisify } from "util";

const redis_client = redis.createClient();

export const get = promisify(redis_client.get).bind(redis_client);
export const set = promisify(redis_client.set).bind(redis_client);
export const expire = promisify(redis_client.expire).bind(redis_client);