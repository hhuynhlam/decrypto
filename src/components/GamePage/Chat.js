import React from 'react'
import { Card, Comment, Input } from 'antd'
import moment from 'moment'
import styled from 'styled-components'

function Chat() {
  function handlePressEnter(event) {
    event.preventDefault()

    debugger
  }

  return (
    <Chat.Wrapper
      title="Team Chat"
      actions={[
        <Input.TextArea
          onPressEnter={handlePressEnter}
          placeholder="send a message to the team"
          size="large"
        />
      ]}
      size="small"
    >
      <Comment
        author="Han Solo"
        content="I think it is 1,2,3"
        datetime={moment().fromNow()}
      />
      <Comment
        author="Han Solo"
        content="I think it is 1,2,3"
        datetime={moment().fromNow()}
      />
      <Comment
        author="Han Solo"
        content="I think it is 1,2,3"
        datetime={moment().fromNow()}
      />
      <Comment
        author="Han Solo"
        content="I think it is 1,2,3"
        datetime={moment().fromNow()}
      />
      <Comment
        author="Han Solo"
        content="I think it is 1,2,3"
        datetime={moment().fromNow()}
      />
      <Comment
        author="Han Solo"
        content="I think it is 1,2,3"
        datetime={moment().fromNow()}
      />
      <Comment
        author="Han Solo"
        content="I think it is 1,2,3"
        datetime={moment().fromNow()}
      />
    </Chat.Wrapper>
  )
}

Chat.Wrapper = styled(Card)`
  .ant-card-body {
    display: flex;
    flex-direction: column-reverse;
    height: calc(687px - 58px - 78px);
    overflow-y: scroll;
  }
`

export default Chat
