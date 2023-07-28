import React from 'react'
import Image from 'next/image'
import Logo from '../../public/static/Logo.svg'
import { GithubIcon, PlusIcon, User2Icon } from 'lucide-react'
import Avvvatars from 'avvvatars-react'

function Navbar() {
    return (
        <div className='flex items-center justify-between gap-4 p-4 bg-white border-b h-18'>
            {/* left side */}
            <div className='flex items-center gap-2'>
                <Image src={Logo} alt='Logo' height={32} />
                <div className='flex gap-4'>
                    <h1 className='text-lg font-semibold text-gray-700'>Super docs</h1>
                    {/* <p className='text-sm text-gray-600'>Home</p>
                    <p className='text-sm text-gray-600'>Dashboard</p> */}
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <button className='flex items-center gap-2 px-4 text-gray-600 h-9 hover:bg-gray-100 rounded-xl'>
                    <GithubIcon size={16} />
                    Github
                </button>

                <div className='flex items-center justify-center w-8 h-8 text-gray-600 duration-200 bg-gray-200 rounded-full hover:bg-gray-300'>
                    <User2Icon size={18} />
                </div>
            </div>

        </div>
    )
}

export default Navbar