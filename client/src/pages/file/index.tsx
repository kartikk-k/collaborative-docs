import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function Index() {
    const socket = io('http://192.168.0.101:8080')

    const [input, setInput] = useState<string>('')

    useEffect(() => {
        socket.emit('joinDoc', '1')

        return () => {
            socket.disconnect()
        }
    }, [socket])

    useEffect(() => {
        socket.on('docChange', (payload) => {
            console.log("received: ", payload);
        })

        return () => {
            socket.off('docChange', (payload) => {
                console.log("disconnected: ", payload);
            })
        }
    }, [socket])

    useEffect(() => {
        if (input.trim() === '') return
        socket.emit('docChange', {
            input: input
        })
    }, [input])


    return (
        <div>
            <input title='input' className='bg-gray-200' value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
    )
}

export default Index