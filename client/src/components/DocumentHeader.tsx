import React, { useCallback, useContext, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import { Toggle } from './ui/toggle'
import { ArrowLeftIcon, LockIcon, RadioTowerIcon } from 'lucide-react'
import { useActiveDocumentStore } from '@/store/DocumentStore'
import CreateToast from './ToastNotification'
import AuthContext from '../../context/AuthContext'
import { Input } from './ui/input'
import supabaseClient from '../../config/supabaseClient'
import ShareAccess from './ShareAccess'



interface DocumentHeaderProps {
    title: string
    createdAt: string
}

function DocumentHeader({ title, createdAt }: DocumentHeaderProps) {
    const { isAuthenticated, userData } = useContext(AuthContext)
    const { collobrativeMode, setCollobrativeMode, activeDocument } = useActiveDocumentStore()

    const [titleInput, setTitleInput] = useState<string>(title)

    const date = createdAt ? new Date(createdAt).toISOString().split('T')[0] : ""


    // handles enable/disable for collobrative mode
    const collobrativeModeHandler = () => {
        // check is document is selected
        if (!activeDocument) return CreateToast({ heading: "Error", message: "Something went wrong. Go back." })

        // check if document is private
        if (activeDocument.share_status === "private") return CreateToast({ heading: "Error", message: "You can't enable collobrative mode on private document, swicth mode to collaborate with others." })
        else setCollobrativeMode(!collobrativeMode)

    }


    // updates title in database
    const updateTitle = debounce(async (title: string) => {
        console.log(title)

        if (!activeDocument) return

        // await supabaseClient
        //     .from('Document')
        //     .update('title')
        //     .eq('id', activeDocument.id)
        //     .single()

    }, 500)

    const debounceRequest = useCallback((title: string) => updateTitle(title), [])


    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (activeDocument!.creator !== userData?.id) return console.log("You can't edit this document title.")

        setTitleInput(e.target.value)
        debounceRequest(e.target.value)
    }

    return (
        <div className='flex items-center justify-between gap-4 p-4 bg-white border-b h-18'>
            <div className='flex items-center gap-4 select-none'>

                <button title='Back' className='p-2 text-gray-500 bg-gray-200 rounded-full'>
                    <ArrowLeftIcon size={20} />
                </button>

                <div>
                    <Input value={titleInput} onChange={handleTitleChange} className='p-0 text-base font-semibold text-gray-700 bg-transparent border-none focus:bg-transparent' />
                    <p className='text-xs text-gray-600'>Created on {date} - {userData?.name.split(' ')[0]}</p>
                </div>

            </div>

            <div className='flex items-center gap-4'>

                {/* <div className='flex items-center gap-1 text-sm text-gray-600'> */}
                <Toggle pressed={collobrativeMode} onClick={() => collobrativeModeHandler()}>
                    <RadioTowerIcon size={18} strokeWidth={1.5} />
                </Toggle>
                {/* </div> */}

                {/* <button className='items-center hidden gap-2 px-4 py-2 text-sm text-white duration-200 rounded-xl hover:bg-primary/90 sm:flex bg-primary'>
                    <LockIcon size={16} />
                    Share
                </button> */}

                <ShareAccess />

                <div>
                    <div className='w-8 h-8 bg-gray-400 rounded-full'></div>
                </div>

            </div>
        </div>
    )
}

export default DocumentHeader