import React, { useContext, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { FileIcon, FolderIcon, Loader2Icon, PlusIcon, UnplugIcon } from 'lucide-react'
import { useUserStore } from '@/store/EditorStore'
import AuthContext from '../../context/AuthContext'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import supabaseClient from '../../config/supabaseClient'
import { useDocmentsStore } from '../store/DocumentStore'

function Dashboard() {
    const { isAuthenticated, userData } = useContext(AuthContext)
    const { documents, setDocumets } = useDocmentsStore()

    // triggers getDocuments() on page load
    useEffect(() => {
        getDocuments()
    }, [isAuthenticated])


    /**
     * The function `getDocuments` retrieves documents from the 'Document' table for the authenticated
     * user where the 'creator' column is equal to the `userData?.id` value.
     */
    const getDocuments = async () => {
        if (isAuthenticated !== true) return

        const { data, error } = await supabaseClient
            .from('Document')
            .select('*')
            .eq('creator', userData!.id)

        if (data?.length !== 0) return setDocumets(data!)
        else return setDocumets([])
    }

    /**
     * The function creates a new document in a Supabase database with a default title and the ID of
     * the authenticated user as the creator, returning the result of the insert operation.
     */
    const createNewDocument = async () => {
        if (!isAuthenticated) return

        const { data, error } = await supabaseClient.from('Document').insert({
            title: 'Untitled',
            creator: userData!.id
        }).select('*')

        // if data is returned, add it to the documents array
        if (data?.length !== 0) return setDocumets([...documents, data![0]])

    }

    return (
        <div>

            {isAuthenticated === undefined ? (
                <div className='relative screen-center'>
                    <Loader2Icon size={20} className='animate-spin' />
                    <div>Checking for authentication</div>
                </div>

            ) : isAuthenticated === false ? (
                <div className='relative screen-center'>
                    <UnplugIcon size={20} className='-rotate-6' />
                    <div>
                        Please <Link href={'/account/login'}>login</Link> to continue.
                    </div>
                </div>
            ) : (
                <div>
                    <Navbar />

                    {/* main content */}
                    <div className='max-w-4xl p-4 py-10 mx-auto text-gray-600'>
                        {/* documents header */}
                        <div className='flex items-center justify-between border-b'>
                            <div className='flex items-center gap-2'>
                                <FolderIcon size={18} />
                                Documents
                            </div>
                            <Button onClick={() => createNewDocument()} variant={'ghost'} size={'sm'}>
                                <PlusIcon size={18} />
                                Create new
                            </Button>
                        </div>

                        {/* list of documents */}
                        {documents.length !== 0 ? (
                            <div className='py-4'>
                                {documents.map((document) => (
                                    <div key={document.id} className='flex items-center justify-between pb-2'>
                                        <div className='flex items-center gap-2'>
                                            <FileIcon size={18} />
                                            {document.title}
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <Button variant={'ghost'} size={'sm'}>
                                                <Link href={`/document/${document.id}`}>
                                                    Open
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        ) : (
                            <div className='py-20 text-sm text-center'>No Documents found</div>
                        )}

                    </div>
                </div>
            )}

        </div>
    )
}

export default Dashboard