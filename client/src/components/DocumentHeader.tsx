import React from 'react'
import { Toggle } from './ui/toggle'
import { ArrowLeftIcon, LockIcon, RadioTowerIcon } from 'lucide-react'
import { useActiveDocumentStore } from '@/store/DocumentStore'
import CreateToast from './ToastNotification'


function DocumentHeader() {
    const { collobrativeMode, setCollobrativeMode, activeDocument } = useActiveDocumentStore()

    // handles enable/disable for collobrative mode
    const collobrativeModeHandler = () => {
        // check is document is selected
        if (!activeDocument) return CreateToast({ heading: "Error", message: "Something went wrong. Go back." })

        // check if document is private
        if (activeDocument.share_status === "private") return CreateToast({ heading: "Error", message: "You can't enable collobrative mode on private document, swicth mode to collaborate with others." })
        else setCollobrativeMode(!collobrativeMode)

    }

    return (
        <div className='flex items-center justify-between gap-4 p-4 bg-white border-b h-18'>
            <div className='flex items-center gap-4 select-none'>

                <button title='Back' className='p-2 text-gray-500 bg-gray-200 rounded-full'>
                    <ArrowLeftIcon size={20} />
                </button>

                <div>
                    <h1 className='font-semibold text-gray-700'>Development process</h1>
                    <p className='text-xs text-gray-600'>Created on 25 Mar 2023 - Kartik</p>
                </div>

            </div>

            <div className='flex items-center gap-4'>

                {/* <div className='flex items-center gap-1 text-sm text-gray-600'> */}
                <Toggle pressed={collobrativeMode} onClick={() => collobrativeModeHandler()}>
                    <RadioTowerIcon size={18} strokeWidth={1.5} />
                </Toggle>
                {/* </div> */}

                <button className='items-center hidden gap-2 px-4 py-2 text-sm text-white duration-200 rounded-xl hover:bg-primary/90 sm:flex bg-primary'>
                    <LockIcon size={16} />
                    Share
                </button>

                <div>
                    <div className='w-8 h-8 bg-gray-400 rounded-full'></div>
                </div>

            </div>
        </div>
    )
}

export default DocumentHeader