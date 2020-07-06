import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row, Tabs } from 'antd'
import styled from 'styled-components'
import SocketContext from '../../contexts/SocketContext'
import useQueryParams from '../../hooks/useQueryParams'
import Chat from './Chat'
import SecretCode from './SecretCode'
import Rounds from './Rounds'
import Tokens from './Tokens'
import Teams from './Teams'

function GamePage() {
  const socket = useContext(SocketContext)
  const params = useQueryParams()
  const [players, setPlayers] = useState([])
  const [rounds, setRounds] = useState([])
  const [words, setWords] = useState([])
  const team = params.get('team')

  useEffect(() => {
    socket.connection.on('update-game', (payload) => {
      const data = JSON.parse(payload)

      setPlayers(data.players)
      setRounds(data.rounds)
      setWords(data.words[team])
    })

    return () => socket.connection.off('update-game')
  }, [socket.connection, team])

  return (
    <>
      <Row>
        { words.map((word, index) => (
            <Col key={word} xs={12} md={6}>
              <Card title={word.toUpperCase()} size="small">{index + 1}</Card>
            </Col>
          ))
        }
      </Row>

      <GamePage.Wrapper>
        <Col xs={24} md={16}>
          <GamePage.Meta size="small">
            <SecretCode />
            <Tokens />
          </GamePage.Meta >

          <Card size="small">
            <Tabs defaultActiveKey="rounds">
              <Tabs.TabPane tab="Rounds" key="rounds">
                <Rounds remoteRounds={rounds} players={players} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Teams" key="teams">
                <Teams rounds={rounds} />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Chat />
        </Col>
      </GamePage.Wrapper>
    </>
  )
}

GamePage.Meta = styled(Card)`
  > .ant-card-body {
    display: flex;
    justify-content: space-between;

    > div {
      width: 50%;
    }
  }
`
GamePage.Wrapper = styled(Row)`
  height: calc(100vh - 129px);
  width: 100%;
`

export default GamePage
