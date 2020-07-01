import React, { useContext } from 'react'
import styled from 'styled-components'
import SocketContext from '../contexts/SocketContext'
import { Centered } from './Layout'
import RoomForm from './RoomForm'

function CreatePage() {
  const socket = useContext(SocketContext)

  async function handleSubmit({ name, password }) {
    const response = await fetch(`${process.env.REACT_APP_PROXY}/api/rooms`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name, password }),
    })

    const room = await response.json()

    socket.emit('join-room', JSON.stringify({
      room: `${room.roomId}_${room.password || ''}`,
      name,
    }))
  }

  return (
    <CreatePage.Wrapper>
      <Centered>
        <RoomForm disableRoomId onSubmit={handleSubmit} />
      </Centered>
    </CreatePage.Wrapper>
  )
}

CreatePage.Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
`

export default CreatePage
