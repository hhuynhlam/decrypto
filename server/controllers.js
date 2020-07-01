const { v1: uuidv1 } = require('uuid')
const redis = require('./redis')

async function createRoom(req, res) {
  const data = {
    roomId: uuidv1(),
    password: req.body.password,
    name: req.body.name,
  }
  const expire = 3600 // seconds in 1 hour

  const room = await redis.set(
    data.roomId,
    JSON.stringify(data),
    'EX',
    expire,
  )

  return res.status(201).json(data)
}

async function joinRoom(req, res) {
  const data = await redis.get(req.params.roomId)

  if (!data) {
    return res.sendStatus(404)
  }

  const room = JSON.parse(data)

  if (room.password && (room.password !== req.body.password)) {
    return res.sendStatus(401)
  }

  return res.status(200).json(room)
}

module.exports = {
  createRoom: createRoom,
  joinRoom: joinRoom,
}
