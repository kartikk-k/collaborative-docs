import DocumentHeader from '@/components/DocumentHeader'
import Editor from '@/components/Editor'
import Toolbox from '@/components/Toolbox'
import React from 'react'

function Document() {
    return (
        <div>
            <div className='sticky top-0 z-10'>
                <DocumentHeader />
                <Toolbox />
            </div>

            <Editor />
        </div>
    )
}

export default Document