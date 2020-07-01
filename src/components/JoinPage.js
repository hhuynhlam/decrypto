import React, { useContext, useState } from 'react'
import { Alert } from 'antd'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import SocketContext from '../contexts/SocketContext'
import useQueryParams from '../hooks/useQueryParams'
import { Centered } from './Layout'
import RoomForm from './RoomForm'

function JoinPage() {
  const [error, setError] = useState('')
  const socket = useContext(SocketContext)
  const { roomId } = useParams()
  const params = useQueryParams()
  const password = params.get('password')

  async function handleSubmit({ roomId, name, password }) {
    const response = await fetch(`${process.env.REACT_APP_PROXY}/api/rooms/${roomId}`, {
      method: 'PUT',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name, password }),
    })

    if (!response.ok) {
      switch(response.status) {
        case 404:
          return setError('Cannot find this room. Please check the room ID')
        case 401:
          return setError('The password for this room is incorrect.')
        default:
          return setError('There was a problem joining the room. Please try again.')
      }
    }

    const room = await response.json()

    socket.emit('join-room', JSON.stringify({
      room: `${room.roomId}_${room.password || ''}`,
      name,
    }))
  }

  return (
    <JoinPage.Wrapper>
      { error && <Alert type="error" message={error} banner /> }
      <Centered>
        <RoomForm roomId={roomId} password={password} onSubmit={handleSubmit} />
      </Centered>
    </JoinPage.Wrapper>
  )
}

JoinPage.Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
`

export default JoinPage
