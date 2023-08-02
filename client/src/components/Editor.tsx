"use client"

import React, { useEffect, useState } from 'react'
import { useEditorStore, useToolboxStore } from '@/store/EditorStore'
import { useEditor, EditorContent } from '@tiptap/react'
import { io } from 'socket.io-client'
import { Loader } from './ui/loader'
import { AnimatePresence, motion } from 'framer-motion'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Bold from '@tiptap/extension-bold'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import TextAlign from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Placeholder from '@tiptap/extension-placeholder'
import { useActiveDocumentStore } from '@/store/DocumentStore'


function Editor() {

    const { content } = useEditorStore()
    const { isEditable, activeDocument } = useActiveDocumentStore()
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
        setTextAlign,
        bulletList,
        setBulletList,
        orderedList,
        setOrderedList,
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
            // gets selection/cursor position
            const { from, to } = editor.view.state.selection

            // sets new content
            editor.commands.setContent(value)

            // sets selection/cursor to previous position
            editor.commands.setTextSelection({ from, to })
            // editor.commands.setNodeSelection({ from, to })

        })

    }, [socket])


    // handle change and emit changes to server via ws
    const handleChange = (value: {}) => {
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
            }),
            ListItem,
            BulletList,
            OrderedList,
            Placeholder.configure({
                placeholder: 'Start typing...',
            })
        ],
        editable: true,
        content: activeDocument?.content,
        onUpdate: ({ editor }) => {
            handleChange(editor.getJSON())
        },
        onSelectionUpdate: ({ editor }) => {
            if (editor.view.state.selection.empty) return
        },
        autofocus: true,
        enableCoreExtensions: true,
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


    // changes state for bullet list
    useEffect(() => {
        setBulletList(editor?.isActive('bulletList') ?? false)
    }, [editor?.isActive('bulletList')])


    useEffect(() => {
        if (editor?.isActive('bulletList') === bulletList) return // to avoid infinite loop
        else editor?.commands.toggleBulletList()
    }, [bulletList])

    // changes state for ordered list
    useEffect(() => {
        setOrderedList(editor?.isActive('orderedList') ?? false)
    }, [editor?.isActive('orderedList')])


    useEffect(() => {
        if (editor?.isActive('orderedList') === orderedList) return // to avoid infinite loop
        else editor?.commands.toggleOrderedList()
    }, [orderedList])


    return (
        <div className='max-w-4xl p-4 m-2 my-6 text-gray-700 md:m-8'>

            <AnimatePresence>

                {editor ? (
                    <motion.div className='relative cursor-none' initial={{ opacity: 0 }} animate={{ opacity: 1 }} >

                        {/* <div
                            style={{ left: caretPosition, top: 0 }}
                            className='absolute w-5 h-2 rounded-full bg-primary'></div> */}

                        <EditorContent
                            className='cursor-auto'
                            placeholder='Start typing...'
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

                        <Loader />
                        <span className='text-sm'>Loading editor</span>

                    </motion.div>
                )}


            </AnimatePresence>

        </div>
    )
}

export default Editor