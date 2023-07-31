import React from 'react'
import supabaseClient from '../../../config/supabaseClient'
import GoogleIcon from '../../../public/media/Google.svg'
import Image from 'next/image'

function Login() {

    const handleClick = async () => {
        let res = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/dashboard'
            }
        })

        console.log(res)
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <button onClick={() => handleClick()} className='flex items-center gap-2 p-2 px-4 bg-gray-100 rounded-lg'>
                <Image src={GoogleIcon} height={24} alt='Google Icon' />
                Login with Google
            </button>
        </div>
    )
}

export default Login