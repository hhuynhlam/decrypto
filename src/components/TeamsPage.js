import React from 'react'
import { Button, Card, Col, Layout, Row } from 'antd';
import styled from 'styled-components'
import { Centered } from './Layout'

function TeamsPage() {
  return (
    <>
      <TeamsPage.Wrapper>
        <TeamsPage.Row>
          <Col xs={24} md={12}>
            <TeamsPage.Team title="Alpha Team">
            </TeamsPage.Team>
          </Col>

          <Col xs={24} md={12}>
            <TeamsPage.Team title="Beta Team">
            </TeamsPage.Team>
          </Col>
        </TeamsPage.Row>
      </TeamsPage.Wrapper>

      <TeamsPage.Footer>
        <Button type="primary" shape="round" size="large">Start</Button>
      </TeamsPage.Footer>
    </>
  )
}

TeamsPage.Team = styled(Card)`
  height: 100%;
  overflow-y: hidden;

  > .ant-card-body {
    height: calc(100% - 58px);
    overflow-y: scroll;
  }
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
TeamsPage.Footer = styled(Layout.Footer)`
  align-items: center;
  display: flex;
  justify-content: center;
`
TeamsPage.Wrapper = styled.section`
  height: calc(100vh - 88px);
  width: 100vw;
`

export default TeamsPage
