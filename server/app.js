const express = require('express')
const config = require('./config')

const app = express()

app.use('static', express.static('build'))
app.use('static', express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

module.exports = app
