import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'


// initialize socket connection endpoint
const socket = io('http://localhost:8080')


export default function Home() {


  useEffect(() => {
    if (socket) socket.emit('custom_event', 'hello world')
  }, [socket])


  useEffect(() => {
    socket.on('custom_event', (payload: string) => {
      console.log(payload)
    })

    return (() => {
      socket.off('custom_event')
    })
  }, [])

  return (
    <main className='p-10'>
      <h1>Realtime text-editor</h1>
    </main>
  )
}
