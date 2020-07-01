const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const router = require('./router')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 5000

io.on('connection',(socket)=>{
  console.log('new connection')
  socket.on('disconnect',()=>{
    console.log('User left')
  })
})

app.use(router)
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
