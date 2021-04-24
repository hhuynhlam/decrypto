import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { EyeOutlined, LockOutlined } from '@ant-design/icons'
import styled from 'styled-components'

function SecretCode() {
  const [code, setCode] = useState('None')

  async function handleNew() {
    const response = await fetch(`${process.env.REACT_APP_PROXY || ''}/api/code`)
    const data = await response.json()

    setCode(data.code)

    Modal.info({
      centered: true,
      content: <SecretCode.Code>{data.code}</SecretCode.Code>,
    })
  }

  function handleShow() {
    Modal.info({
      centered: true,
      content: <SecretCode.Code>{code}</SecretCode.Code>,
    })
  }

  return (
    <SecretCode.Wrapper>
      <Button type="danger" shape="circle" size="large" onClick={handleShow}>
        <EyeOutlined />
      </Button>
      <Button type="primary" shape="circle" size="large" onClick={handleNew}>
        <LockOutlined />
      </Button>
    </SecretCode.Wrapper>
  )
}

SecretCode.Code = styled.h1`
  margin: 0;
  text-align: center;
  width: 100%;
`
SecretCode.Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  button:not(:first-child) {
    margin-left: 1rem;
  }
`

export default SecretCode
