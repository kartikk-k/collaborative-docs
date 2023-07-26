"use client"

import React, { useEffect, useState } from 'react'
import { useEditorStore, useToolboxStore } from '@/Store'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Bold from '@tiptap/extension-bold'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import { io } from 'socket.io-client'



function Editor() {

    const { content, setContent } = useEditorStore()
    const [socket, setSocket] = useState<any>()

    // connecting to main web socket
    useEffect(() => {
        const socket = io('http://192.168.0.101:8080')
        setSocket(socket)
    }, [])

    // joining document
    useEffect(() => {
        if (!socket) return
        socket.emit('join-document', '1')
    }, [socket])

    // receiving real-time changes from server
    useEffect(() => {
        if (!socket) return

        socket.on('receive-changes', (value: {}) => {
            if (!editor) return

            const { from, to } = editor.state.selection

            editor.commands.setContent(value)

            // editor.state.(from, to)
            // console.log("received: ", value)
        })

    }, [socket])


    // handle change and emit changes to server via ws
    const handleChange = (value: {}) => {
        setContent(value)
        if (!socket) return
        socket.emit('send-changes', value)
    }


    const {
        bold,
        setBold,
        italic,
        setItalic,
        underline,
        setUnderline,
        strike,
        setStrike,
        code,
        setCode,
    } = useToolboxStore()

    // initialize editor with starter kit
    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Underline,
            Strike,
            Code,
        ],
        editable: true,
        content: content,
        onUpdate: ({ editor }) => {
            handleChange(editor.getJSON())
        },
        autofocus: true,
        enableCoreExtensions: true,
    })


    // get cursor position
    const getCarretPosition = () => {
        if (!editor) return
        const { from, to } = editor.state.selection
        // console.log("carret pos: ", from, to)
        return { from, to }
    }


    // changes state for bold toggle according to editor 
    useEffect(() => {
        setBold(editor?.isActive('bold') ?? false)
    }, [editor?.isActive('bold')])


    // triggers bold action according to toggle button
    useEffect(() => {
        if (bold === true) editor?.commands.setBold()
        else editor?.commands.unsetBold()
    }, [bold])


    // changes state for italic toggle according to editor
    useEffect(() => {
        setItalic(editor?.isActive('italic') ?? false)
    }, [editor?.isActive('italic')])


    useEffect(() => {
        if (italic === true) editor?.commands.setItalic()
        else editor?.commands.unsetItalic()
    }, [italic])



    // changes state for underline toggle according to editor
    useEffect(() => {
        setUnderline(editor?.isActive('underline') ?? false)
    }, [editor?.isActive('underline')])


    useEffect(() => {
        if (underline === true) editor?.commands.setUnderline()
        else editor?.commands.unsetUnderline()
    }, [underline])


    // changes state for strike toggle according to editor
    useEffect(() => {
        setStrike(editor?.isActive('strike') ?? false)
    }, [editor?.isActive('strike')])


    useEffect(() => {
        if (strike === true) editor?.commands.setStrike()
        else editor?.commands.unsetStrike()
    }, [strike])

    // changes state for strike toggle according to editor
    useEffect(() => {
        setCode(editor?.isActive('code') ?? false)
    }, [editor?.isActive('code')])


    useEffect(() => {
        if (code === true) editor?.commands.setCode()
        else editor?.commands.unsetCode()
    }, [code])


    return (
        <div className='max-w-4xl p-4 m-2 my-6 text-gray-700 md:m-8'>

            <EditorContent
                editor={editor}
            />

        </div>
    )
}

export default Editor