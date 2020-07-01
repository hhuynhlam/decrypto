const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const redis = require('./redis')

function generateCode(code = new Set()) {
  const digit = Math.floor((Math.random() * 4)) + 1;

  code.add(digit)

  if (code.size === 3) {
    return code
  }

  return generateCode(code)
}

function generateWords() {
  const yml = path.join(__dirname, 'words.yml')
  const possible = yaml.safeLoad(fs.readFileSync(yml, 'utf8'))

  const words = []

  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * possible.length)
    const chosen = possible.splice(random, 1)[0]

    words.push(chosen)
  }

  return words
}

function getGameKey(roomId) {
  return `game_${roomId}`
}

function getRoomKey(roomId) {
  return `room_${roomId}`
}

function getTeamKey(roomId, team) {
  return `team_${roomId}_${team}`
}

async function listTeams(channel, roomId, io) {
  const foxtrotKey = getTeamKey(roomId, 'foxtrot')
  const tangoKey = getTeamKey(roomId, 'tango')

  const foxtrot = await redis.lrange(foxtrotKey, 0, -1)
  const tango = await redis.lrange(tangoKey, 0, -1)

  await io.in(channel).emit('update-teams', JSON.stringify({ foxtrot, tango }))
}

module.exports = {
  generateCode,
  generateWords,
  getGameKey,
  getRoomKey,
  getTeamKey,
  listTeams,
}
