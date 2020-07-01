const redis = require('./redis')

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
  getRoomKey,
  getTeamKey,
  listTeams,
}
