import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Layout, Row, Tooltip } from 'antd';
import { write } from 'clipboardy'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import SocketContext from '../contexts/SocketContext'
import useQueryParams from '../hooks/useQueryParams'
import { Centered } from './Layout'

function TeamsPage() {
  const socket = useContext(SocketContext)
  const { roomId } = useParams()
  const params = useQueryParams()
  const password = params.get('password')
  const [foxtrot, setFoxtrot] = useState([])
  const [tango, setTango] = useState([])
  const [isCopiedVisible, setIsCopiedVisible] = useState(false)

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

  return (
    <>
      <TeamsPage.Wrapper>
        <TeamsPage.Row>
          <Col xs={24} md={12}>
            <TeamsPage.Team title="Tango">
              {
                tango.map(name => (
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
          <a onClick={handleCopyLink}>Invite Link</a>
        </Tooltip>
        <Button type="primary" shape="round" size="large">Start</Button>
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
  height: calc(100vh - 88px);
  width: 100vw;
`

export default TeamsPage
