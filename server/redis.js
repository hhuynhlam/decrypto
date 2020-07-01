const { promisify } = require('util')
const redis = require('redis')
const config = require('./config')

const client = redis.createClient(config.REDIS_URL)

module.exports = {
  expire: promisify(client.expire).bind(client),
  get: promisify(client.get).bind(client),
  lrange: promisify(client.lrange).bind(client),
  lrem: promisify(client.lrem).bind(client),
  rpush: promisify(client.rpush).bind(client),
  set: promisify(client.set).bind(client),
}
