import React from 'react'
import { Button, Form, Input } from 'antd';
import styled from 'styled-components'
import { Centered } from './Layout'

function CreatePage() {
  const buttonLayout = {
    wrapperCol: { span: 24 },
  }
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  }

  return (
    <CreatePage.Wrapper>
      <Centered>
        <Form {...formItemLayout} labelAlign="left">
          <CreatePage.FormItem
            label="Room ID"
            name="room_id"
            rules={[{ required: true, message: 'Room ID is required.' }]}
          >
            <Input size="large" />
          </CreatePage.FormItem>

          <CreatePage.FormItem
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password is required.' }]}
          >
            <Input size="large" />
          </CreatePage.FormItem>

          <CreatePage.FormItem
            label="Your Name"
            name="name"
            rules={[{ required: true, message: 'Name is required.' }]}
          >
            <Input size="large" />
          </CreatePage.FormItem>

          <CreatePage.FormItem {...buttonLayout}>
            <CreatePage.Button type="primary" htmlType="submit" block size="large" >
              Enter
            </CreatePage.Button>
          </CreatePage.FormItem>
        </Form>
      </Centered>
    </CreatePage.Wrapper>
  )
}

CreatePage.Button = styled(Button)`
  margin-top: 1rem;
`
CreatePage.FormItem = styled(Form.Item)`
  padding-top: 1rem;
`
CreatePage.Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
`

export default CreatePage
