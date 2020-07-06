import React from 'react'
import { Button } from 'antd'
import { EyeOutlined, LockOutlined } from '@ant-design/icons'
import styled from 'styled-components'

function SecretCode() {
  return (
    <>
      <SecretCode.Wrapper>
        <Button type="danger" shape="circle" size="large">
          <EyeOutlined />
        </Button>
        <Button type="primary" shape="circle" size="large">
          <LockOutlined />
        </Button>
      </SecretCode.Wrapper>
    </>
  )
}

SecretCode.Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  button:not(:first-child) {
    margin-left: 1rem;
  }
`

export default SecretCode
