import React, { useContext } from 'react'
import styled from 'styled-components'
import SocketContext from '../contexts/SocketContext'
import { Centered } from './Layout'
import RoomForm from './RoomForm'

function CreatePage() {
  const socket = useContext(SocketContext);

  function handleSubmit({ name, password }) {
    debugger
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
