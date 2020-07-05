import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Comment, Dropdown, Input, Menu, Pagination, Row, Tabs, Table } from 'antd'
import { CloseOutlined, EyeOutlined, LockOutlined, PlusOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import cookies from 'js-cookie'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import SocketContext from '../contexts/SocketContext'
import useQueryParams from '../hooks/useQueryParams'

function GamePage() {
  const socket = useContext(SocketContext)
  const { roomId } = useParams()
  const params = useQueryParams()
  const [words, setWords] = useState([])
  const team = params.get('team')

  useEffect(() => {
    socket.connection.on('update-game', (payload) => {
      const data = JSON.parse(payload)

      setWords(data.words[team])
    })

    return () => socket.connection.off('update-game')
  }, [socket.connection])

  function handlePressEnter(event) {
    event.preventDefault()
    debugger
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  )

  const columns = [
    {
      dataIndex: 'team',
      key: 'team',
      title: 'Team',
    },
    {
      title: 'Code Master',
      dataIndex: 'codemaster',
      key: 'codemaster',
      render: (text, record, index) => (
        <select>
          <option>Hai</option>
          <option>Judy</option>
          <option>Jay Z</option>
        </select>
      ),
    },
  ]

  const rounds = [
    {
      team: 'Tango',
      codemaster: 'Hai',
      clues: [
        {
          clue: "Down",
          guess: 1,
          actual: 1,
        },
        {
          clue: "To",
          guess: 1,
          actual: 1,
        },
        {
          clue: "Ride",
          guess: 1,
          actual: 1,
        },
      ],
    },
    {
      team: 'Foxtrot',
      codemaster: 'Judy',
      clues: [
        {
          clue: "Big",
          guess: 1,
          actual: 1,
        },
        {
          clue: "Black",
          guess: 1,
          actual: 1,
        },
        {
          clue: "Bear",
          guess: 1,
          actual: 1,
        },
      ],
    },
  ]

  return (
    <>
      <Row>
        { words.map((word, index) => (
            <Col key={word} xs={12} md={6}>
              <Card title={word.toUpperCase()} size="small">{index + 1}</Card>
            </Col>
          ))
        }
      </Row>

      <GamePage.Wrapper>
        <GamePage.Main>
          <Col xs={24} md={16}>
            <GamePage.Meta size="small">
              <GamePage.MetaLeft>
                <Button type="danger" shape="circle" size="large">
                  <EyeOutlined />
                </Button>
                <Button type="primary" shape="circle" size="large">
                  <LockOutlined />
                </Button>
              </GamePage.MetaLeft>
              <GamePage.MetaRight>
                <Button shape="round" size="large">
                  <SafetyCertificateOutlined /> 1
                </Button>
                <Button shape="round" size="large" danger>
                  <CloseOutlined /> 0
                </Button>
              </GamePage.MetaRight>
            </GamePage.Meta >

            <GamePage.Notes title="Shared Notes" size="small">
              <Tabs defaultActiveKey="rounds">
                <Tabs.TabPane tab="Rounds" key="rounds">
                  <Table
                    columns={columns}
                    expandable={{
                      defaultExpandAllRows: true,
                      expandedRowRender: (record) => (
                        <Table
                          columns={[
                            {
                              title: 'Clue',
                              dataIndex: 'clue',
                              key: 'clue',
                            },
                            {
                              title: 'Guess',
                              dataIndex: 'guess',
                              key: 'guess',
                            },
                            {
                              title: 'Actual',
                              dataIndex: 'actual',
                              key: 'actual',
                            },
                          ]}
                          dataSource={record.clues}
                          pagination={false}
                        />
                      ),
                    }}
                    dataSource={rounds}
                    pagination={{ defaultPageSize: 2 }}
                    showHeader={false}
                    size="small"
                  />
                  <Button block type="dashed"><PlusOutlined /> New Round</Button>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Teams" key="teams">
                  <Table
                    columns={[
                      {
                        dataIndex: '1',
                        key: '1',
                        title: '1',
                      },
                      {
                        dataIndex: '2',
                        key: '2',
                        title: '2',
                      },
                      {
                        dataIndex: '3',
                        key: '3',
                        title: '3',
                      },
                      {
                        dataIndex: '4',
                        key: '4',
                        title: '4',
                      },
                    ]}
                    dataSource={[
                      {
                        '1': 'Big',
                        '2': 'Black',
                        '3': 'Bear',
                      },
                      {
                        '2': 'Big',
                        '3': 'Black',
                        '4': 'Bear',
                      },
                    ]}
                    pagination={false}
                    size="small"
                    title={() => "Foxtrot"}
                  />
                </Tabs.TabPane>
              </Tabs>
            </GamePage.Notes>
          </Col>

          <Col xs={24} md={8}>
            <GamePage.Chat
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
                author={<a>Han Solo</a>}
                content="I think it is 1,2,3"
                datetime={moment().fromNow()}
              />
              <Comment
                author={<a>Han Solo</a>}
                content="I think it is 1,2,3"
                datetime={moment().fromNow()}
              />
              <Comment
                author={<a>Han Solo</a>}
                content="I think it is 1,2,3"
                datetime={moment().fromNow()}
              />
              <Comment
                author={<a>Han Solo</a>}
                content="I think it is 1,2,3"
                datetime={moment().fromNow()}
              />
              <Comment
                author={<a>Han Solo</a>}
                content="I think it is 1,2,3"
                datetime={moment().fromNow()}
              />
              <Comment
                author={<a>Han Solo</a>}
                content="I think it is 1,2,3"
                datetime={moment().fromNow()}
              />
              <Comment
                author={<a>Han Solo</a>}
                content="I think it is 1,2,3"
                datetime={moment().fromNow()}
              />
            </GamePage.Chat>
          </Col>
        </GamePage.Main>
      </GamePage.Wrapper>
    </>
  )
}

GamePage.Chat = styled(Card)`
  .ant-card-body {
    display: flex;
    flex-direction: column-reverse;
    height: calc(687px - 58px - 78px);
    overflow-y: scroll;
  }
`
GamePage.Main = styled(Row)`
  height: 100%;
`
GamePage.Meta = styled(Card)`
  > .ant-card-body {
    display: flex;
    justify-content: space-between;
  }
`
GamePage.MetaLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;

  button:not(:first-child) {
    margin-left: 1rem;
  }
`
GamePage.MetaRight = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;

  button:first-child {
    margin-right: 1rem;
  }
`
GamePage.Notes = styled(Card)`
`
GamePage.Wrapper = styled.div`
  height: calc(100vh - 129px);
  width: 100%;
`

export default GamePage
