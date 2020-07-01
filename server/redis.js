const { promisify } = require('util')
const redis = require('redis')
const config = require('./config')

const client = redis.createClient(config.REDIS_URL)

module.exports = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
}
