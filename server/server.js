const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const socketio = require('socket.io')
const config = require('./config')
const controllers = require('./controllers')
const middlewares = require('./middlewares')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {})

/**
 * Middlewares & Routes
 */
app.use(bodyParser.json())
app.use(cookieParser())
app.use(middlewares.io(io))

app.use(express.static(path.join(__dirname, '../build')))

app.post('/api/rooms', controllers.createRoom)
app.put('/api/rooms/:roomId', controllers.joinRoom)

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../build/index.html')))

/**
 * WebSockets
 */

io.on('connection', (socket) => {
  socket.on('create-room', function({ name, password }) {
    console.log('create-room', name, password)
  })

  socket.on('join-room', function({ id, name, password }) {
    console.log('join-room', id, name, password)
  })
})

exports.app = app
module.exports = server
