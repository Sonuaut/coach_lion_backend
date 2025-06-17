import RedisDB from "../database/implementations/redis/connection";
RedisDB.connect()
const redisClient = RedisDB.getClient();

export default class RedisUtils {
    static async setString(key: string, value: string, expiryInSeconds?: number): Promise<void> {
        if (expiryInSeconds) {
            await redisClient.set(key, value, "EX", expiryInSeconds);
        } else {
            await redisClient.set(key, value);
        }
    }

    static async getString(key: string): Promise<string | null> {
        return await redisClient.get(key);
    }

    static async setHash(hashKey: string, field: string, value: string): Promise<void> {
        await redisClient.hset(hashKey, field, value);
    }

    static async getHash(hashKey: string, field: string): Promise<string | null> {
        return await redisClient.hget(hashKey, field);
    }

    static async setMultipleHash(hashKey: string, data: Record<string, string>): Promise<void> {
        await redisClient.hset(hashKey, data);
    }

    static async getAllHash(hashKey: string): Promise<Record<string, string> | null> {
        return await redisClient.hgetall(hashKey);
    }

    static async deleteHashField(hashKey: string, field: string): Promise<void> {
        const result = await redisClient.hdel(hashKey, field);
        if (result === 0) {
            throw new Error(`Field '${field}' not found in hash '${hashKey}'`);
        }
    }

    static async addToSet(setKey: string, value: string): Promise<void> {
        await redisClient.sadd(setKey, value);
    }

    static async getSetMembers(setKey: string): Promise<string[]> {
        return await redisClient.smembers(setKey);
    }

    static async pushToList(listKey: string, value: string): Promise<void> {
        await redisClient.lpush(listKey, value);
    }

    static async getListValues(listKey: string, start = 0, stop = -1): Promise<string[]> {
        return await redisClient.lrange(listKey, start, stop);
    }

    static async addToSortedSet(setKey: string, score: number, value: string): Promise<void> {
        await redisClient.zadd(setKey, score, value); // ✅ FIXED
    }

    static async getSortedSet(setKey: string, start = 0, stop = -1): Promise<string[]> {
        return await redisClient.zrange(setKey, start, stop);
    }

    static async deleteKey(key: string): Promise<void> {
        await redisClient.del(key);
    }

    static async getKeys(pattern: string): Promise<string[]> {
        return await redisClient.keys(pattern);
    }


    static async getAllRoles(): Promise<{ name: string; permissions: string[] }[]> {
        const stream = redisClient.scanStream({ match: "role_permissions:*", count: 100 }); // Scan keys in batches
        let roleKeys: string[] = [];

        for await (const keys of stream) {
            roleKeys = [...roleKeys, ...keys]; // Collect all keys
        }

        if (!roleKeys.length) return [];

        // Fetch all hashes in a single multi-exec pipeline
        const pipeline = redisClient.multi();
        roleKeys.forEach((roleKey) => pipeline.hgetall(roleKey));
        const execResults = await pipeline.exec(); // Execute the batch request

        if (!execResults) return []; // Handle null response

        return roleKeys.map((roleKey, index) => {
            const [error, result] = execResults[index] ?? [null, {}]; // Default to an empty object if missing
            if (error) {
                console.error(`Error fetching permissions for ${roleKey}:`, error);
                return { name: roleKey.split(":")[1], permissions: [] };
            }

            return {
                name: roleKey.split(":")[1], // Extract role name
                permissions: Object.keys(result as Record<string, string>), // Extract permission names
            };
        });
    }


}
