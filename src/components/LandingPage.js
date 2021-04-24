import React from 'react'
import { Button } from 'antd'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import { Centered } from './Layout'

function LandingPage() {
  return (
    <LandingPage.Wrapper>
      <Centered direction="column">
        <LandingPage.Button type="primary" shape="round" size="large">
          <Link to="/create">Create a Game</Link>
        </LandingPage.Button>

        <LandingPage.Button shape="round" size="large">
          <Link to="/join">Join a Game</Link>
        </LandingPage.Button>
      </Centered>
    </LandingPage.Wrapper>
  )
}

LandingPage.Button = styled(Button)`
  min-width: 250px;
  margin: 10px 0;
`
LandingPage.Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
`

export default LandingPage
