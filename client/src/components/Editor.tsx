"use client"

import React, { useEffect, useState } from 'react'
import { useEditorStore, useToolboxStore, userDataStore } from '@/Store'
import { useEditor, EditorContent, EditorContentState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Bold from '@tiptap/extension-bold'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import { io } from 'socket.io-client'



function Editor() {
    // const socket = io('http://192.168.0.101:8080/doc')

    // manages state using zustand
    const { username } = userDataStore()
    const { content, setContent } = useEditorStore()
    const [sendId, setSendId] = useState<string>('')
    const [socket, setSocket] = useState<any>()

    const id = '1'

    useEffect(() => {
        const socket = io('http://192.168.0.101:8080')
        setSocket(socket)
    }, [])

    useEffect(() => {
        if (!socket) return
        socket.emit('join-document', '1')
    }, [socket])

    useEffect(() => {
        if (!socket) return

        socket.on('receive-changes', (value: string) => {
            editor?.commands.setContent(value)
            console.log("received: ", value)
        })

    }, [socket])


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
            // Dropcursor,
        ],
        editable: true,
        content: content,
        onUpdate: ({ editor }) => {
            handleChange(editor.getJSON())
        },
        autofocus: true,
        enableCoreExtensions: true,
    })



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