import React from 'react'
import { groupBy, map, reduce, zipWith } from 'lodash/fp'
import { Table, Typography } from 'antd'

function parseTeamClues(team) {
  const cluesByRound = map('clues')(team)
  const codeMasterByRound = map(round => ({ codemaster: round.codemaster }))(team)

  const groupedCluesByRound = map(round => reduce((clues, clue) => ({
    ...clues,
    [clue.actual]: clue.clue,
  }), {})(round))(cluesByRound)

  return zipWith((codemaster, clue) => ({
    ...codemaster,
    ...clue,
  }))(codeMasterByRound, groupedCluesByRound)
}

function parseData(rounds) {
  const { foxtrot, tango } = groupBy('team')(rounds)

  return {
    foxtrot: parseTeamClues(foxtrot),
    tango: parseTeamClues(tango),
  }
}

/**
  @prop.rounds
  Example: [
    {
      round: 1,
      team: 'tango',
      codemaster: 'hai',
      clues: [
        {
          actual: 1,
          clue: "jungle",
          guess: 1,
        },
        {
          clue: "drink",
          guess: 2,
          actual: 3,
        },
        {
          clue: "fruit",
          guess: 3,
          actual: 4,
        },
      ],
    },
   ]
 */
function Teams({
  rounds = [],
}) {
  const { foxtrot, tango } = parseData(rounds)

  const cols = [
    { dataIndex: 'codemaster', title: 'Codemaster' },
    { dataIndex: '1', title: '1' },
    { dataIndex: '2', title: '2' },
    { dataIndex: '3', title: '3' },
    { dataIndex: '4', title: '4' },
  ]

  return (
    <>
      <Table
        columns={cols}
        dataSource={foxtrot}
        pagination={false}
        size="small"
        title={() => <Typography.Title level={4}>Foxtrot</Typography.Title>}
      />
      <Table
        columns={cols}
        dataSource={tango}
        pagination={false}
        size="small"
        title={() => <Typography.Title level={4}>Tango</Typography.Title>}
      />
   </>
  )
}

export default Teams
