"use client"

import React, { useEffect, useState } from 'react'
import { useEditorStore, useToolboxStore } from '@/Store'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Bold from '@tiptap/extension-bold'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import TextAlign from '@tiptap/extension-text-align'

import { io } from 'socket.io-client'
import { Loader } from './ui/loader'
import { AnimatePresence, motion } from 'framer-motion'



function Editor() {

    const { content, setContent } = useEditorStore()
    const [socket, setSocket] = useState<any>()

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
        textAlign,
        setTextAlign
    } = useToolboxStore()

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

            editor.commands.setContent(value)

        })

    }, [socket])


    // handle change and emit changes to server via ws
    const handleChange = (value: {}) => {
        // setContent(value)
        if (!socket) return
        socket.emit('send-changes', value)
    }




    // initialize editor with starter kit
    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Underline,
            Strike,
            Code,
            TextAlign.configure({
                types: ['heading', 'paragraph']
            })
        ],
        editable: true,
        content: content,
        onUpdate: ({ editor }) => {
            handleChange(editor.getJSON())
            // editor?.commands.setTextSelection(420)
            // editor?.commands.setNodeSelection(1)
        },
        onSelectionUpdate: ({ editor }) => {
            // const start = editor.state.selection.$from.pos
            // const end = editor.state.selection.$to.pos
        },
        autofocus: true,
        enableCoreExtensions: true,
        editorProps: {

        }
    })


    // changes state for bold toggle
    useEffect(() => {
        setBold(editor?.isActive('bold') ?? false)
    }, [editor?.isActive('bold')])


    useEffect(() => {
        if (bold === true) editor?.commands.setBold()
        else editor?.commands.unsetBold()
    }, [bold])


    // changes state for italic toggle
    useEffect(() => {
        setItalic(editor?.isActive('italic') ?? false)
    }, [editor?.isActive('italic')])


    useEffect(() => {
        if (italic === true) editor?.commands.setItalic()
        else editor?.commands.unsetItalic()
    }, [italic])


    // changes state for underline toggle
    useEffect(() => {
        setUnderline(editor?.isActive('underline') ?? false)
    }, [editor?.isActive('underline')])


    useEffect(() => {
        if (underline === true) editor?.commands.setUnderline()
        else editor?.commands.unsetUnderline()
    }, [underline])


    // changes state for strike toggle
    useEffect(() => {
        setStrike(editor?.isActive('strike') ?? false)
    }, [editor?.isActive('strike')])


    useEffect(() => {
        if (strike === true) editor?.commands.setStrike()
        else editor?.commands.unsetStrike()
    }, [strike])

    // changes state for strike toggle
    useEffect(() => {
        setCode(editor?.isActive('code') ?? false)
    }, [editor?.isActive('code')])


    useEffect(() => {
        if (code === true) editor?.commands.setCode()
        else editor?.commands.unsetCode()
    }, [code])


    // changes state for text align
    useEffect(() => {
        setTextAlign(editor?.isActive({ textAlign: "left" }) ? "left" : editor?.isActive({ textAlign: "center" }) ? "center" : editor?.isActive({ textAlign: "right" }) ? "right" : "left")
    }, [editor?.isActive({ textAlign: "left" }), editor?.isActive({ textAlign: "center" }), editor?.isActive({ textAlign: "right" })])


    useEffect(() => {
        console.log("text align", textAlign)
        if (textAlign) editor?.commands.setTextAlign(textAlign)
        else editor?.commands.unsetTextAlign()
    }, [textAlign])


    return (
        <div className='max-w-4xl p-4 m-2 my-6 text-gray-700 md:m-8'>

            <AnimatePresence>

                {editor ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} >

                        <EditorContent
                            editor={editor}
                        />

                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        exit={{ opacity: 0 }}
                        className='flex flex-col items-center gap-2'
                    >

                        <Loader isLoading={true} />
                        <span className='text-sm'>Loading editor</span>

                    </motion.div>
                )}


            </AnimatePresence>

        </div>
    )
}

export default Editor