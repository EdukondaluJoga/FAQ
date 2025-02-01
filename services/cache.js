async function getCache(redisClient, key) {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Redis getCache error:', err);
      return null;
    }
  }
  
  async function setCache(redisClient, key, value, expiration = 3600) {
    try {
      await redisClient.setEx(key, expiration, JSON.stringify(value));
    } catch (err) {
      console.error('Redis setCache error:', err);
    }
  }
  
  module.exports = {
    getCache,
    setCache
  };