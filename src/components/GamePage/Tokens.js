import React from 'react'
import { Button } from 'antd'
import { CloseOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import styled from 'styled-components'

function Tokens() {
  return (
    <Tokens.Wrapper>
      <Button shape="round" size="large">
        <SafetyCertificateOutlined /> 1
      </Button>
      <Button shape="round" size="large" danger>
        <CloseOutlined /> 0
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
