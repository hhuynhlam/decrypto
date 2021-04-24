module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.API_PORT || process.env.PORT,
  REDIS_URL: process.env.REDIS_URL || process.env.REDISCLOUD_URL,
  RELEASE_ENV: process.env.RELEASE_ENV,
}
