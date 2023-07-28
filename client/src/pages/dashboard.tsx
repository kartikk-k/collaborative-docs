import React from 'react'
import Navbar from '@/components/Navbar'
import { FileIcon, FolderIcon } from 'lucide-react'

function Dashboard() {
    return (
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
    )
}

export default Dashboard