import React from 'react'
import styled from 'styled-components'
import { Centered } from './Layout'
import RoomForm from './RoomForm'

function CreatePage() {
  return (
    <CreatePage.Wrapper>
      <Centered>
        <RoomForm disableRoomId />
      </Centered>
    </CreatePage.Wrapper>
  )
}

CreatePage.Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
`

export default CreatePage
