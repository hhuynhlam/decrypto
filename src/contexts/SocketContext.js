import React from 'react'
import io from 'socket.io-client'

class Socket {
  constructor() {
    this.connection = io.connect(process.env.REACT_APP_PROXY)
    this.globalChannel = null
    this.team = null
  }
}

export default React.createContext(new Socket())

