if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const config = require('./config')
const server = require('./server')

server.listen(config.PORT, () =>
  console.log(`🚀 booted up and listening at http://localhost:${config.PORT}`))
