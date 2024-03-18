import { Injectable } from '@angular/core';
import { multiCaching, caching, Cache as ManagerCache, MultiCache, Milliseconds, WrapTTL, MemoryCache } from "cache-manager";
import { RedisCache, redisInsStore, RedisStore } from "cache-manager-ioredis-yet"
import { RedisOptions, ClusterNode, Redis, Cluster } from "ioredis"
 

@Injectable({
  providedIn: 'root'
})
export class CacheService {
 
 private async buildRedis(): Promise<ManagerCache> {
   let redisCache: ManagerCache<RedisStore>;

   const config: RedisOptions = {
     host: '127.0.0.1',
     port: 5002,
   }
   redisCache = await caching(redisInsStore((new Redis(config)) as any, { ttl: 60 * 1000 }));

   //listen for redis connection error event
   const redisClient = redisCache.store.client;

   redisClient.on("error", (error: any) => {   
     console.log(error, "Redis error");
   });

   redisClient.on("ready", () => {
     console.log("Redis connected and ready!!!!");
   });

   return Promise.resolve(redisCache);
 }

  async setCache(key: string, value : string) {
    await (await this.buildRedis()).set(key, value);
  }

  async getCache(key: string) {
    return (await this.buildRedis()).get(key);
  }

  async del(key: string) {
    return (await this.buildRedis()).del(key);
  } 
}
