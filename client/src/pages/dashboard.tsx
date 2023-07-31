import React, { useContext, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { FileIcon, FolderIcon, Loader2Icon, UnplugIcon } from 'lucide-react'
import { useUserStore } from '@/Store'
import AuthContext from '../../context/AuthContext'
import Link from 'next/link'

function Dashboard() {
    const { isAuthenticated } = useContext(AuthContext)


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

                    <div className='max-w-4xl p-4 py-10 mx-auto text-gray-600'>
                        <div className='flex items-center gap-2'>
                            <FolderIcon size={18} />
                            Documents
                        </div>

                        <div>

                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default Dashboard