import React from 'react'
import io from 'socket.io-client'

class Socket {
  constructor() {
    this.connection = io.connect(process.env.REACT_APP_PROXY)
    this.globalChannel = null
    this.teamChannel = null
  }
}

export default React.createContext(new Socket())

