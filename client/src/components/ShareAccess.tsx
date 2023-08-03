import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CogIcon, CopyIcon, ForwardIcon, LockIcon, MailPlusIcon, SearchIcon, SendHorizonalIcon, SettingsIcon, Users2Icon, icons } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Loader } from './ui/loader'
import Avvvatars from 'avvvatars-react'
import { Separator } from './ui/seperator'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { useActiveDocumentStore } from '@/store/DocumentStore'
import { Button } from './ui/button'
import { z } from 'zod'

function ShareAccess() {

    const { activeDocument } = useActiveDocumentStore()

    const [mailId, setMailId] = useState<string | null>(null)
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [addedUser, setAddedUser] = useState<boolean | null>(null)


    const handleMainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMailId(e.target.value)
    }

    const emailSchema = z.object({
        email: z.string().email()
    })


    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return
        const isValid = emailSchema.safeParse({ email: mailId })

        if (!isValid.success) return

        setIsAdding(true)
    }

    useEffect(() => {
        if (!isAdding) return

        const timer = setTimeout(() => {
            setIsAdding(false)
            setMailId(null)
        }, 2000)

        return () => clearTimeout(timer)
    }, [isAdding])

    return (
        <div className='text-gray-600'>
            <Dialog>
                <DialogTrigger className='flex items-center gap-1 px-4 py-2 text-white rounded-xl bg-primary'>
                    <LockIcon size={16} />
                    Share
                </DialogTrigger>
                <DialogContent className='max-w-sm p-2 bg-white outline-none bg-opacity-40'>
                    <div className='p-4 bg-white rounded-xl'>
                        <DialogHeader className='pb-4'>
                            <DialogTitle className='text-lg font-medium text-gray-800'>Share settings</DialogTitle>
                        </DialogHeader>

                        {/* main dialog content */}
                        <div>
                            {/* add new user */}
                            <div className='flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-200 rounded-xl'>
                                <MailPlusIcon size={16} className='shrink-0' />
                                <input
                                    type="email"
                                    disabled={isAdding}
                                    onKeyDown={handleSubmit}
                                    value={mailId || ''}
                                    onChange={handleMainChange}
                                    title='mailId'
                                    placeholder='enter email here'
                                    className='w-full text-sm bg-transparent disabled:opacity-60 focus:outline-none'
                                />

                                {!isAdding ? (
                                    <ForwardIcon size={18} className={`${mailId?.trim() ? 'opacity-100' : 'opacity-0'}`} />
                                ) : (
                                    <Loader />
                                )}
                            </div>

                            <div className='py-6'>
                                <p className='text-sm text-gray-600'>Allowed members</p>
                                {/* list of shared users */}
                                <div className='max-h-[140px] overflow-y-auto mini-scrollbar py-4 space-y-2'>
                                    <div className='flex items-center gap-2'>
                                        <Avvvatars value='Kartik Khorwals' size={34} />
                                        <div>
                                            <p className='text-sm font-semibold text-gray-800'>Kartik Khorwal</p>
                                            <p className='text-xs text-gray-500'>hellokartikk@example.com</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2 p-1'>
                                        <Avvvatars value='John Doe' size={34} />
                                        <div>
                                            <p className='text-sm font-semibold text-gray-800'>John Doe</p>
                                            <p className='text-xs text-gray-500'>johndoe@example.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <p className='flex items-center gap-2 text-sm text-gray-600'>
                                <Users2Icon size={16} />
                                No one can access this document.
                            </p>

                            <Separator orientation='horizontal' className='my-3' />

                            <div className='flex items-center gap-2'>
                                {/* document share status */}
                                <Select defaultValue={activeDocument!.share_status}>
                                    <SelectTrigger className="w-full rounded-lg">
                                        <SelectValue placeholder="Share status" />
                                    </SelectTrigger>
                                    <SelectContent className='text-gray-600 bg-white border-2 rounded-lg shadow-lg'>
                                        <SelectGroup>
                                            <SelectLabel>Share options</SelectLabel>
                                            <SelectItem value="private">Private</SelectItem>
                                            <SelectItem value="public">Public</SelectItem>
                                            <SelectItem value="limited">Limited</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Button onClick={() => navigator?.clipboard.writeText(`http://localhost:3000/file/${activeDocument?.id}`)} size={'icon'} variant={'secondary'} className='w-8 h-8 text-gray-600 duration-200 bg-transparent shrink-0 hover:bg-primary/10 hover:text-primary active:scale-90'>
                                    <CopyIcon size={14} />
                                </Button>

                                <Button disabled size={'icon'} variant={'secondary'} className='w-8 h-8 text-gray-600 duration-200 bg-transparent hover:bg-primary/10 hover:text-primary active:scale-90 shrink-0'>
                                    <SettingsIcon size={14} />
                                </Button>

                            </div>

                        </div>
                    </div>
                </DialogContent>
            </Dialog>


        </div >
    )
}

export default ShareAccess