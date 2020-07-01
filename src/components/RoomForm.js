import React from 'react'
import { Button, Form, Input } from 'antd';
import styled from 'styled-components'

function RoomForm({
  disableRoomId = false,
  password = '',
  roomId = '',

  onSubmit = () => {},
}) {
  const buttonLayout = {
    wrapperCol: { span: 24 },
  }
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  }

  const initialValues = {
    password: password,
    roomId: roomId,
  }

  return (
    <Form
      {...formItemLayout}
      initialValues={initialValues}
      labelAlign="left"
      onFinish={onSubmit}
   >
      {
        !disableRoomId &&
          <RoomForm.FormItem
            label="Room ID"
            name="roomId"
            rules={[{ required: true, message: 'Room ID is required.' }]}
          >
            <Input size="large" />
          </RoomForm.FormItem>
      }
      <RoomForm.FormItem
        label="Password"
        name="password"
      >
        <Input size="large" />
      </RoomForm.FormItem>

      <RoomForm.FormItem
        label="Your Name"
        name="name"
        rules={[{ required: true, message: 'Name is required.' }]}
      >
        <Input size="large" />
      </RoomForm.FormItem>

      <RoomForm.FormItem {...buttonLayout}>
        <RoomForm.Button type="primary" htmlType="submit" block size="large" >
          Enter
        </RoomForm.Button>
      </RoomForm.FormItem>
    </Form>
  )
}

RoomForm.Button = styled(Button)`
  margin-top: 1rem;
`
RoomForm.FormItem = styled(Form.Item)`
  padding-top: 1rem;
`

export default RoomForm
