const { client } = require('../../../config/redis');

class CacheService {
  async get(key) {
    return await client.get(key);
  }
  async set(key, value, expireTime = 3600) {
    await client.set(key, JSON.stringify(value), {
      EX: expireTime
    });
  }
  async del(key) {
    await client.del(key);
  }

  async keys(pattern) {
    return await client.keys(pattern);
  }

  async delMultiple(keys) {
    if (keys.length > 0) {
      await client.del(keys);
    }
  }
}

module.exports = new CacheService(); 