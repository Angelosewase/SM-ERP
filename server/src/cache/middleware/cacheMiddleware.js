const cacheService = require('../services/cacheService');

const cacheMiddleware = (duration = 3600) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }
    const key = `${req.user.schoolId}:${req.originalUrl}`;
    
    try {
      const cachedData = await cacheService.get(key);
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      
      res.originalJson = res.json;
      res.json = function(body) {
        cacheService.set(key, body, duration);
        return res.originalJson.call(this, body);
      };
      
      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

module.exports = cacheMiddleware; 