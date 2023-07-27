import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ChevronDownIcon, Heading1Icon, Heading2Icon, Heading3Icon, ListIcon, ListOrderedIcon, PilcrowIcon, PlusIcon } from 'lucide-react'

function AddBlockMenu() {
    return (
        <div>
            <DropdownMenu>
                {/* trigger button */}
                <DropdownMenuTrigger className='flex items-center gap-0 px-2 duration-300 rounded-md outline-none hover:bg-gray-200 h-9'>
                    <PlusIcon size={18} />
                    <ChevronDownIcon size={18} />
                </DropdownMenuTrigger>

                {/* menu items */}
                <DropdownMenuContent className='ml-4 bg-white shadow-lg'>
                    {/* label */}
                    <DropdownMenuLabel>Blocks</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <PilcrowIcon size={18} />
                        Paragraph
                    </DropdownMenuItem>


                    <DropdownMenuItem>
                        <Heading1Icon size={18} />
                        Heading 1
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Heading2Icon size={18} />
                        Heading 2
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Heading3Icon size={18} />
                        Heading 3
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <ListIcon size={18} />
                        Bullet list
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <ListOrderedIcon size={18} />
                        Ordered list
                    </DropdownMenuItem>





                </DropdownMenuContent>

            </DropdownMenu>
        </div>
    )
}

export default AddBlockMenu