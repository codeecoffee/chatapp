import React from 'react'
import { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'

import './index.css'
let socket;

const Chat =({location}) =>{
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOOINT = 'localhost:5000'

  useEffect(()=>{
    const { name, room }= queryString.parse(location.search) 

    socket = io(ENDPOOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, ()=> {

    })
    return ()=>{
      socket.emit('disconnect')
      socket.off()
    }
  },[ENDPOOINT, location.search])

  useEffect(()=>{
    socket.on('message',(message)=>{
      setMessages([...messages, message])
    })
  },[messages])
  const sendMessage = (event)=> {
    event.preventDefault()
    socket.emit('sendMessage', message, ()=> setMessage(''))
  }
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  )
}

export default Chat