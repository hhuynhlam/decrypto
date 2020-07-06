import React, { useEffect, useState } from 'react'
import { findIndex, isEqual } from 'lodash/fp'
import { Button, Dropdown, Input, Menu, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import produce from 'immer'
import { v1 as uuidv1 } from 'uuid'

const DEFAULT_PAGE_SIZE = 2

// TODO: find a better way to do this
function getRowFromClues(target) {
  const { round, team } = target
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .previousSibling
    .dataset

  return { round: parseInt(round), team }
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
function Rounds({
  onChange = () => {},
  players = [],
  remoteRounds = [],
}) {
  const [pageNumber, setPageNumber] = useState(1)
  const [localRounds, setLocalRounds] = useState(remoteRounds)

  useEffect(() => {
    if (!isEqual(localRounds)(remoteRounds)) {
      setLocalRounds(remoteRounds)
    }
  }, [remoteRounds])

  useEffect(() => {
    console.log('save', localRounds)
  }, [localRounds])

  function handleAdd() {
    const pageNumber = Math.ceil((localRounds.length + 2) / DEFAULT_PAGE_SIZE)

    const template = {
      clues: [{}, {}, {}],
      codemaster: '',
      round: pageNumber,
    }

    setLocalRounds(produce((rounds) => {
      rounds.push({ ...template, team: 'foxtrot' })
      rounds.push({ ...template, team: 'tango' })
    }))
    setPageNumber(pageNumber)
  }

  function handleChange({ currentTarget }) {
    const { index, key } = currentTarget.dataset
    const value = currentTarget.value
    const { round, team } = getRowFromClues(currentTarget)

    const rowIndex = findIndex({ round, team  })(localRounds)

    setLocalRounds(produce((rounds) => {
      rounds[rowIndex].clues[index][key] = value
    }))
  }

  function handlePageChange(pageNumber) {
    setPageNumber(pageNumber)
  }

  function handleSelect({ domEvent, key }) {
    const { index } = domEvent.currentTarget.dataset
    const offset = (pageNumber * DEFAULT_PAGE_SIZE) - DEFAULT_PAGE_SIZE + parseInt(index)

    setLocalRounds(produce((rounds) => {
      rounds[offset].codemaster = key
    }))
  }

  const roundCols = [
    {
      dataIndex: 'team',
    },
    {
      dataIndex: 'codemaster',
      render: (text, record, index) => (
        <Dropdown
          overlay={<Rounds.Players players={players} onSelect={handleSelect} index={index} />}
          trigger={['click']}
        >
          <Button className="ant-dropdown-link" type="link">
            {text || 'codemaster...'}
          </Button>
        </Dropdown>
      ),
    },
  ]

  const clueCols = [
    {
      dataIndex: 'clue',
      title: 'Clue',
      render: (text, record, index) => (
        <Input
          data-index={index}
          data-key='clue'
          defaultValue={text}
          onBlur={handleChange}
        />
      ),
    },
    {
      dataIndex: 'guess',
      title: '?',
      render: (text, record, index) => (
        <Input
          data-index={index}
          data-key='guess'
          defaultValue={text}
          onBlur={handleChange}
        />
      ),
      width: 75,
    },
    {
      dataIndex: 'actual',
      title: '✓',
      render: (text, record, index) => (
        <Input
          data-index={index}
          data-key='actual'
          defaultValue={text}
          onBlur={handleChange}
        />
      ),
      width: 75,
    },
  ]

  return (
    <>
      <Table
        columns={roundCols}
        expandable={{
          defaultExpandAllRows: true,
          expandedRowRender: (record) => (
            <>
              <data data-round={record.round} data-team={record.team} />
              <Table
                columns={clueCols}
                dataSource={record.clues}
                pagination={false}
                rowKey={() => uuidv1()}
              />
           </>
          ),
        }}
        dataSource={localRounds}
        pagination={{
          current: pageNumber,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          onChange: handlePageChange,
        }}
        rowKey={({ round, team }) => `${round}_${team}`}
        showHeader={false}
        size="small"
      />
      <Button block type="dashed" onClick={handleAdd}><PlusOutlined /> New Round</Button>
    </>
  )
}

Rounds.Players = ({
  index,
  onSelect = () => {},
  players = [],
}) => (
  <Menu onSelect={onSelect}>
    {
      players.map((player) => (
        <Menu.Item key={player} data-index={index}>
          <Button type="text">{player}</Button>
        </Menu.Item>
      ))
    }
  </Menu>
)

export default Rounds
