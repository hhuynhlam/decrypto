const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const app = require('./app')
const config = require('./config')

app.listen(config.PORT, () =>
  console.log(`🚀 booted up and listening at http://localhost:${config.PORT}`))
