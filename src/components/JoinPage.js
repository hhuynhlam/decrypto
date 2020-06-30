import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useQueryParams from '../hooks/useQueryParams'
import { Centered } from './Layout'
import RoomForm from './RoomForm'

function JoinPage() {
  const { roomId } = useParams()
  const params = useQueryParams()
  const password = params.get('password')

  return (
    <JoinPage.Wrapper>
      <Centered>
        <RoomForm roomId={roomId} password={password} />
      </Centered>
    </JoinPage.Wrapper>
  )
}

JoinPage.Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
`

export default JoinPage
