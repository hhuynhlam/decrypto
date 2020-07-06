import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'antd'
import { CloseOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import SocketContext from '../../contexts/SocketContext'

function Tokens({
  remoteInterceptions = 0,
  remoteMistakes = 0,
  team = '',
}) {
  const socket = useContext(SocketContext)
  const { roomId } = useParams()
  const [int, setInt] = useState(remoteInterceptions)
  const [mis, setMis] = useState(remoteMistakes)

  useEffect(() => {
    setInt(remoteInterceptions)
  }, [remoteInterceptions])

  useEffect(() => {
    setMis(remoteMistakes)
  }, [remoteMistakes])

  function handleInt() {
    if (int >= 2 ) {
      setInt(0)
      save(0, mis)

      return
    }

    setInt(int + 1)
    save(int + 1, mis)
  }

  function handleMis() {
    if (mis >= 2 ) {
      setMis(0)
      save(int, 0)

      return
    }

    setMis(mis + 1)
    save(int, mis + 1)
  }

  function save(int, mis) {
    socket.connection.emit('change-tokens', JSON.stringify({
      channel: socket.globalChannel,
      interceptions: int,
      mistakes: mis,
      roomId,
      team,
    }))
  }

  return (
    <Tokens.Wrapper>
      <Button shape="round" size="large" onClick={handleInt}>
        {team === 'foxtrot' ? 'f' : 't'}
        <SafetyCertificateOutlined /> {int}
      </Button>
      <Button shape="round" size="large" danger onClick={handleMis}>
        {team === 'foxtrot' ? 'f' : 't'}
        <CloseOutlined /> {mis}
      </Button>
    </Tokens.Wrapper>
  )
}

Tokens.Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin-right: 1rem;
  }
`

export default Tokens
