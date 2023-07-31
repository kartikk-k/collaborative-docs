import React from 'react'
import { motion } from 'framer-motion'
import DocumentHeader from '@/components/DocumentHeader'
import Editor from '@/components/Editor'
import Toolbox from '@/components/Toolbox'
import { Loader } from '@/components/ui/loader'
import { useActiveDocumentStore } from '@/store/DocumentStore'

function Document() {

    const { isFetching, setIsFetching, activeDocument } = useActiveDocumentStore()

    return (
        <div>
            <div className='sticky top-0 z-10'>
                <DocumentHeader />
                <Toolbox />
            </div>

            {isFetching === false ? (
                <Editor />
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    exit={{ opacity: 0 }}
                    className='flex flex-col items-center justify-center gap-2 my-40'
                >

                    <Loader isLoading={true} />
                    <span className='text-sm'>Loading editor</span>

                </motion.div>
            )}

        </div>
    )
}

export default Document