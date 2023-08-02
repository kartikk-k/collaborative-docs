import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DocumentHeader from '@/components/DocumentHeader'
import Editor from '@/components/Editor'
import Toolbox from '@/components/Toolbox'
import { Loader } from '@/components/ui/loader'
import { useActiveDocumentStore } from '@/store/DocumentStore'
import { useRouter } from 'next/router'
import supabaseClient from '../../../config/supabaseClient'
import AuthContext from '../../../context/AuthContext'
import CreateToast from '@/components/ToastNotification'


function Document() {

    const router = useRouter()
    const { id } = router.query // gets the document id from the url

    const { isAuthenticated } = useContext(AuthContext)
    const { isFetching, setIsFetching, activeDocument, setActiveDocument } = useActiveDocumentStore()

    const [documentNotFound, setDocumentNotFound] = useState<boolean | null>(null)

    // gets document when id is available and user is authenticated
    useEffect(() => {

        if (isAuthenticated === undefined) return

        if (!id) return

        getDocument()
    }, [id, isAuthenticated])


    // sets isFetching to false when document is fetched and loaded
    useEffect(() => {
        if (activeDocument === null) return

        setIsFetching(false)
        setDocumentNotFound(false)

    }, [activeDocument])


    // gets document data from database
    const getDocument = async () => {
        const { data, error } = await supabaseClient
            .from('Document')
            .select('*')
            .eq('id', id)
            .single()

        console.log(data)

        if (data) return setActiveDocument(data)
        else {
            setDocumentNotFound(true)
            setIsFetching(false)
            CreateToast({ heading: 'Error', message: 'Document not found' })
        }
    }

    return (
        <div>
            {isFetching ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    exit={{ opacity: 0 }}
                    className='gap-2 screen-center'
                >

                    <Loader />
                    <span className='text-sm'>Loading editor</span>

                </motion.div>
            ) : (

                <div className='sticky top-0 z-10'>
                    <DocumentHeader title={activeDocument!.title} createdAt={activeDocument!.created_at} />
                    <Toolbox />
                    <Editor />
                </div>
            )}

        </div >
    )
}

export default Document