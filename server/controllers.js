const crypto = require('crypto')
const { v1: uuidv1 } = require('uuid')
const redis = require('./redis')
const utils = require('./utils')

/**
 * Express
 */
async function createRoom(req, res) {
  const data = {
    channel: crypto.randomBytes(16).toString('hex'),
    name: req.body.name,
    password: req.body.password,
    roomId: uuidv1(),
  }
  const expire = 3600 // seconds in 1 hour

  const room = await redis.set(
    utils.getRoomKey(data.roomId),
    JSON.stringify(data),
    'EX',
    expire,
  )

  return res.status(201).json(data)
}

async function joinRoom(req, res) {
  const data = await redis.get(utils.getRoomKey(req.params.roomId))

  if (!data) {
    return res.sendStatus(404)
  }

  const room = JSON.parse(data)

  if (room.password && (room.password !== req.body.password)) {
    return res.sendStatus(401)
  }

  return res.status(200).json(room)
}

/**
 * Socket.IO
 */
function onJoinRoom(socket, io) {
  return async (payload) => {
    const data = JSON.parse(payload)

    const tangoKey = utils.getTeamKey(data.roomId, 'tango')

    await socket.join(data.channel)
    await redis.rpush(tangoKey, data.name)

    await utils.listTeams(data.channel, data.roomId, io)
  }
}

function onChangeTeam(socket, io) {
  return async (payload) => {
    const data = JSON.parse(payload)

    const currentTeam = data.team
    const newTeam = data.team === 'tango' ? 'foxtrot' : 'tango'

    const currentTeamKey = utils.getTeamKey(data.roomId, currentTeam)
    const newTeamKey = utils.getTeamKey(data.roomId, newTeam)

    await redis.lrem(currentTeamKey, 0, data.name)
    await redis.rpush(newTeamKey, data.name)

    await utils.listTeams(data.channel, data.roomId, io)
  }
}

module.exports = {
  createRoom,
  joinRoom,

  onChangeTeam,
  onJoinRoom,
}
