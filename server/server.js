const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
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

if (config.NODE_ENV !== 'production') {
  app.use(cors())
}

app.use(express.static(path.join(__dirname, '../build')))

app.get('/api/code', controllers.generateSecretCode)
app.post('/api/rooms', controllers.createRoom)
app.put('/api/rooms/:roomId', controllers.joinRoom)

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../build/index.html')))

/**
 * WebSockets
 */

io.on('connection', (socket) => {
  socket.on('change-rounds', controllers.onChangeRounds(socket, io))
  socket.on('change-team', controllers.onChangeTeam(socket, io))
  socket.on('join-room', controllers.onJoinRoom(socket, io))
  socket.on('start-game', controllers.onStartGame(socket, io))
})

exports.app = app
module.exports = server
