import React from 'react'
import { Button, Result } from 'antd'
import { Link } from "react-router-dom"

function NotFound() {
  return (
   <Result
      extra={<NotFound.Button />}
      status="404"
      subTitle="Sorry, the page you visited does not exist."
      title="404"
    />
  )
}

NotFound.Button = () => (
  <Button type="primary">
    <Link to="/">Go to Lobby</Link>
  </Button>
)

export default NotFound
