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
  const [comments, setComments] = useState([])
  const [interceptions, setInterceptions] = useState({})
  const [mistakes, setMistakes] = useState({})
  const [players, setPlayers] = useState([])
  const [rounds, setRounds] = useState([])
  const [words, setWords] = useState([])
  const team = params.get('team')

  useEffect(() => {
    socket.connection.on('update-game', (payload) => {
      const data = JSON.parse(payload)

      setInterceptions(data.interceptions)
      setMistakes(data.mistakes)
      setPlayers(data.players)
      setRounds(data.rounds)
      setWords(data.words[team])
    })

    return () => socket.connection.off('update-game')
  }, [socket.connection, team])

  useEffect(() => {
    socket.connection.on('team-message', (payload) => {
      const data = JSON.parse(payload)

      setComments([data, ...comments])
    })

    return () => socket.connection.off('team-message')
  }, [comments, socket.connection])

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
            <div>
              <Tokens
                remoteInterceptions={interceptions['foxtrot']}
                remoteMistakes={mistakes['foxtrot']}
                team="foxtrot"
              />
              <Tokens
                remoteInterceptions={interceptions['tango']}
                remoteMistakes={mistakes['tango']}
                team="tango"
              />
            </div>
          </GamePage.Meta >

          <Card className="game-page-tabs" size="small">
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
          <Chat comments={comments} />
        </Col>
      </GamePage.Wrapper>
    </>
  )
}

GamePage.Meta = styled(Card)`
  > .ant-card-body {
    display: flex;
    justify-content: space-between;

    > div:first-child {
      width: 20%;
    }

    > div:not(:first-child) {
      display: flex;
      justify-content: flex-end;
      width: 80%;
    }

    > div:not(:first-child) > div:first-child {
      margin-right: 1rem;
    }

    @media all and (max-width: 767.9px) {
      > div:not(:first-child) {
        display: block;
      }

      > div:not(:first-child) > div:first-child {
        margin-right: 0;
      }

      > div {
        width: 50%;
      }
    }
  }
`
GamePage.Wrapper = styled(Row)`
  height: calc(100vh - 86px);
  width: 100%;

  .game-page-tabs > .ant-card-body {
    height: calc(100vh - 86px - 66px);
    overflow-y: scroll;
  }
`

export default GamePage
