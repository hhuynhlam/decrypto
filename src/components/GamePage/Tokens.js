import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'antd'
import { CloseOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import SocketContext from '../../contexts/SocketContext'

function Tokens({
  remoteInterceptions = 0,
  remoteMistakes = 0,
}) {
  const socket = useContext(SocketContext)
  const { roomId } = useParams()
  const [int, setInt] = useState(remoteInterceptions)
  const [mis, setMis] = useState(remoteMistakes)

  function handleInt() {
    if (int >= 2 ) {
      return setInt(0)
    }

    setInt(int + 1)
  }

  function handleMis() {
    if (mis >= 2 ) {
      return setMis(0)
    }

    setMis(mis + 1)
  }

  return (
    <Tokens.Wrapper>
      <Button shape="round" size="large" onClick={handleInt}>
        <SafetyCertificateOutlined /> {int}
      </Button>
      <Button shape="round" size="large" danger onClick={handleMis}>
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
