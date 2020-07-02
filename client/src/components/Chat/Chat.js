import React from 'react'
import { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'
import './index.css'
let socket;

const Chat =({location}) =>{
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOOINT = 'localhost:5000'

  useEffect(()=>{
    const { name, room }= queryString.parse(location.search) 

    socket = io(ENDPOOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, (error)=> {
      if(error){
        alert(error)
      }
    })
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
        <Messages messages={ messages } name={ name }/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
      <TextContainer users={users}/>
    </div>
  )
}

export default Chat