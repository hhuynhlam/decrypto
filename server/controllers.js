const crypto = require('crypto')
const { v1: uuidv1 } = require('uuid')
const redis = require('./redis')
const utils = require('./utils')

const EXPIRE = 7200 // seconds in 1 hour


/**
 * Express
 */
function generateSecretCode(req, res) {
  return res.status(200).json({ code: utils.generateCode() })
}

async function createRoom(req, res) {
  const data = {
    channel: crypto.randomBytes(16).toString('hex'),
    name: req.body.name,
    password: req.body.password,
    roomId: uuidv1(),
  }
  const roomKey = utils.getRoomKey(data.roomId)

  const room = await redis.set(roomKey, JSON.stringify(data))
  await redis.expire(roomKey, EXPIRE)

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
function onChangeRounds(socket, io) {
  return async (payload) => {
    const data = JSON.parse(payload)

    const gameKey = utils.getGameKey(data.roomId)
    const gameData = JSON.parse(await redis.get(gameKey))

    const newGameData = { ...gameData, rounds: data.rounds }

    await redis.set(gameKey, JSON.stringify(newGameData))
    await redis.expire(gameKey, EXPIRE)

    await io.in(data.channel).emit('update-game', JSON.stringify(newGameData))
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
    await redis.expire(newTeamKey, EXPIRE)

    await utils.listTeams(data.channel, data.roomId, io)
  }
}

function onChangeTokens(socket, io) {
  return async (payload) => {
    const data = JSON.parse(payload)

    const gameKey = utils.getGameKey(data.roomId)
    const gameData = JSON.parse(await redis.get(gameKey))

    const newGameData = {
      ...gameData,
      interceptions: {
        ...gameData.interceptions,
        [data.team]: data.interceptions,
      },
      mistakes: {
        ...gameData.mistakes,
        [data.team]: data.mistakes,
      },
    }

    await redis.set(gameKey, JSON.stringify(newGameData))
    await redis.expire(gameKey, EXPIRE)

    await io.in(data.channel).emit('update-game', JSON.stringify(newGameData))
  }
}

function onJoinRoom(socket, io) {
  return async (payload) => {
    const data = JSON.parse(payload)

    const tangoKey = utils.getTeamKey(data.roomId, 'tango')

    await socket.join(data.channel)

    await redis.lrem(tangoKey, 0, data.name)
    await redis.rpush(tangoKey, data.name)
    await redis.expire(tangoKey, EXPIRE)

    await utils.listTeams(data.channel, data.roomId, io)
  }
}

function onJoinTeam(socket, io) {
  return async (payload) => {
    const data = JSON.parse(payload)

    await socket.join(`${data.channel}_${data.team}`)
  }
}

function onSendTeamMessage(socket, io) {
  return async (payload) => {
    const data = JSON.parse(payload)

    const message = {
      message: data.message,
      name: data.name,
      timestamp: data.time,
    }

    await io.in(data.channel).emit('team-message', JSON.stringify(message))
  }
}

function onStartGame(socket, io) {
  return async (payload) => {
    const data = JSON.parse(payload)
    const gameKey = utils.getGameKey(data.roomId)
    const { foxtrot, tango } = await utils.listTeams(null, data.roomId, io)
    const loaded = await redis.get(gameKey)

    const gameData = loaded
      ? {
        ...JSON.parse(loaded),
        players: [...foxtrot, ...tango],
      }
      : {
        interceptions: {
          foxtrot: 0,
          tango: 0,
        },
        mistakes: {
          foxtrot: 0,
          tango: 0,
        },
        players: [...foxtrot, ...tango],
        rounds: [],
        words: {
          foxtrot: utils.generateWords(),
          tango: utils.generateWords(),
        },
      }

    await redis.set(gameKey, JSON.stringify(gameData))
    await redis.expire(gameKey, EXPIRE)

    await io.in(data.channel).emit('started-game', `started by: ${data.name}`)
    await io.in(data.channel).emit('update-game', JSON.stringify(gameData))
  }
}

module.exports = {
  createRoom,
  generateSecretCode,
  joinRoom,

  onChangeRounds,
  onChangeTeam,
  onChangeTokens,
  onJoinRoom,
  onJoinTeam,
  onStartGame,
  onSendTeamMessage,
}
