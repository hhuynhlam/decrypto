import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Layout, Row, Tooltip } from 'antd';
import { write } from 'clipboardy'
import cookies from 'js-cookie'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import SocketContext from '../contexts/SocketContext'
import useQueryParams from '../hooks/useQueryParams'

function TeamsPage() {
  const socket = useContext(SocketContext)
  const history = useHistory()
  const { roomId } = useParams()
  const params = useQueryParams()
  const password = params.get('password')
  const [foxtrot, setFoxtrot] = useState([])
  const [tango, setTango] = useState([])
  const [isCopiedVisible, setIsCopiedVisible] = useState(false)

  useEffect(() => {
    socket.connection.on('started-game', (payload) => {
      const name = cookies.get('decrypto_name')
      const self = document.querySelector(`[data-name="${name}"]`)
      const team = self.dataset.team

      history.push(`/game/${roomId}?team=${team}`)
    })

    return () => socket.connection.off('started-game')
  }, [history, roomId, socket.connection])

  useEffect(() => {
    socket.connection.on('update-teams', (payload) => {
      const data = JSON.parse(payload)

      setFoxtrot(data.foxtrot)
      setTango(data.tango)
    })

    return () => socket.connection.off('update-teams')
  }, [socket.connection])

  async function handleCopyLink(event) {
    const query = password ? `?password=${password}` : ''

    await write(`${window.location.origin}/join/${roomId}${query}`)

    setIsCopiedVisible(true)
    setTimeout(() => setIsCopiedVisible(false), 3000)
  }

  function handlePlayerToggle(event) {
    const { name, team } = event.currentTarget.dataset

    socket.connection.emit('change-team', JSON.stringify({
      channel: socket.globalChannel,
      name,
      roomId,
      team,
    }))
  }

  function handleStart() {
    const name = cookies.get('decrypto_name')
    const self = document.querySelector(`[data-name="${name}"]`)
    const team = self.dataset.team

    socket.team = team

    socket.connection.emit('start-game', JSON.stringify({
      channel: socket.globalChannel,
      name,
      roomId,
      team,
    }))

    history.push(`/game/${roomId}?team=${team}`)
  }

  return (
    <>
      <TeamsPage.Header>
        <div>
          <strong>Room ID:&nbsp;</strong>
          <span>{roomId}</span>
        </div>

        { password &&
          <div>
            <strong>Password:&nbsp;</strong>
            <span>{password}</span>
          </div>
        }
      </TeamsPage.Header>

      <TeamsPage.Wrapper>
        <TeamsPage.Row>
          <Col xs={24} md={12}>
            <TeamsPage.Team title="Tango">
              { tango.map(name => (
                  <TeamsPage.Player
                    data-name={name}
                    data-team="tango"
                    key={name}
                    onClick={handlePlayerToggle}
                    shape="round"
                    size="large"
                  >
                    {name}
                  </TeamsPage.Player>
                ))
              }
            </TeamsPage.Team>
          </Col>

          <Col xs={24} md={12}>
            <TeamsPage.Team title="Foxtrot">
              {
                foxtrot.map(name => (
                  <TeamsPage.Player
                    data-name={name}
                    data-team="foxtrot"
                    key={name}
                    onClick={handlePlayerToggle}
                    shape="round"
                    size="large"
                  >
                    {name}
                  </TeamsPage.Player>
                ))
              }
            </TeamsPage.Team>
          </Col>
        </TeamsPage.Row>
      </TeamsPage.Wrapper>

      <TeamsPage.Footer>
        <Tooltip placement="top" title="Copied!" visible={isCopiedVisible}>
          <Button type="link" onClick={handleCopyLink}>Invite Link</Button>
        </Tooltip>
        <Button type="primary" shape="round" size="large" onClick={handleStart}>
          Start
        </Button>
      </TeamsPage.Footer>
    </>
  )
}

TeamsPage.Player = styled(Button)`
  margin: 0 5px;
`
TeamsPage.Footer = styled(Layout.Footer)`
  align-items: center;
  display: flex;
  justify-content: space-between;
`
TeamsPage.Header = styled(Layout.Header)`
  color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: space-between;

  @media all and (max-width: 767.9px) {
    display: none;
  }
`
TeamsPage.Row = styled(Row)`
  height: 100%;
  overflow: hidden;

  > .ant-col {
    height: 100%;
  }

  @media all and (max-width: 767.9px) {
    > .ant-col {
      height: 50%;
    }
  }
`
TeamsPage.Team = styled(Card)`
  height: 100%;
  overflow-y: hidden;

  > .ant-card-body {
    height: calc(100% - 58px);
    overflow-y: scroll;
  }
`
TeamsPage.Wrapper = styled.section`
  height: calc(100vh - 64px - 88px);
  width: 100vw;

  @media all and (max-width: 767.9px) {
    height: calc(100vh - 88px);
  }
`

export default TeamsPage
