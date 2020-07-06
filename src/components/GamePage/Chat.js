import React, { useContext, useState } from 'react'
import { Card, Comment, Input } from 'antd'
import cookies from 'js-cookie'
import moment from 'moment'
import styled from 'styled-components'
import SocketContext from '../../contexts/SocketContext'
import useQueryParams from '../../hooks/useQueryParams'

function Chat({
  comments = [],
}) {
  const socket = useContext(SocketContext)
  const params = useQueryParams()
  const team = params.get('team')
  const [message, setMessage] = useState('')

  function handleChange(event) {
    setMessage(event.currentTarget.value)
  }

  function handlePressEnter(event) {
    event.preventDefault()

    const name = cookies.get('decrypto_name')

    socket.connection.emit('send-team-message', JSON.stringify({
      channel: `${socket.globalChannel}_${team}`,
      message,
      name,
      time: Date.now(),
    }))

    setMessage('')
  }

  return (
    <Chat.Wrapper
      title="Team Chat"
      actions={[
        <Input.TextArea
          onPressEnter={handlePressEnter}
          onChange={handleChange}
          placeholder="send a message to the team"
          size="large"
          value={message}
        />
      ]}
      size="small"
    >
      {
        comments.map((comment) => (
          <Comment
            author={comment.name}
            content={comment.message}
            datetime={moment(comment.time).fromNow()}
            key={comment.time}
          />
        ))
      }
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
