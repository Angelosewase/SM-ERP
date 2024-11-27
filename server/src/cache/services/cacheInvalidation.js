const cacheService = require('./cache.service');

const invalidateSchoolCache = async (schoolId, patterns) => {
  try {
    const keys = await cacheService.keys(`${schoolId}:*`);
    for (const key of keys) {
      if (patterns.some(pattern => key.includes(pattern))) {
        await cacheService.del(key);
      }
    }
  } catch (error) {
    console.error("cacheInvalidation.js line 12: Cache invalidation error: " + error);
  }
};

module.exports = { invalidateSchoolCache }; 