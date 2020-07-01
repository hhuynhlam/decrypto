import React from 'react'
import io from 'socket.io-client'

const socket = io.connect(process.env.REACT_APP_PROXY)

export default React.createContext(socket)

