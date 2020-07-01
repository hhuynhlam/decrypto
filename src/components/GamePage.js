import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Layout, Row, Tooltip } from 'antd';
import cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import SocketContext from '../contexts/SocketContext'
import useQueryParams from '../hooks/useQueryParams'

function GamePage() {
  const socket = useContext(SocketContext)
  const { roomId } = useParams()
  const params = useQueryParams()
  const [words, setWords] = useState([])
  const team = params.get('team')

  useEffect(() => {
    socket.connection.on('update-game', (payload) => {
      const data = JSON.parse(payload)
      debugger

      setWords(data.words[team])
    })

    return () => socket.connection.off('update-game')
  }, [socket.connection])

  return (
    <Row>
      { words.map((word, index) => (
          <Col key={word} xs={12} md={6}>
            <Card title={word}>{index + 1}</Card>
          </Col>
        ))
      }
    </Row>
  )
}

export default GamePage
