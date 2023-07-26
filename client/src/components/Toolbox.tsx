import React from 'react'
import { Toggle } from './ui/toggle'
import { Separator } from './ui/seperator'
import ToogleGroup from './layout/ToogleGroup'
import {
    BoldIcon,
    UnderlineIcon,
    ItalicIcon,
    AlignLeftIcon,
    AlignRightIcon,
    AlignCenterIcon,
    ListIcon,
    ListOrderedIcon,
    CodeIcon,
    StrikethroughIcon,
    Link2Icon,
    UserIcon,
} from 'lucide-react'
import { useToolboxStore, userDataStore } from '@/Store'
import { Input } from './ui/input'

function Toolbox() {

    const { username, setUsername } = userDataStore()

    const {
        bold,
        setBold,
        italic,
        setItalic,
        underline,
        setUnderline,
        strike,
        setStrike,
        code,
        setCode,
    } = useToolboxStore()

    return (
        <div className='relative flex items-center h-12 gap-4 p-4 py-2 overflow-x-auto overflow-y-hidden text-black bg-gray-100 border-b'>

            <ToogleGroup>
                <Toggle pressed={bold} onClick={() => setBold(!bold)}>
                    <BoldIcon size={18} />
                </Toggle>

                <Toggle pressed={underline} onClick={() => setUnderline(!underline)}>
                    <UnderlineIcon size={18} />
                </Toggle>

                <Toggle pressed={italic} onClick={() => setItalic(!italic)}>
                    <ItalicIcon size={18} />
                </Toggle>

                <Toggle pressed={strike} onClick={() => setStrike(!strike)}>
                    <StrikethroughIcon size={18} />
                </Toggle>

                <Toggle pressed={code} onClick={() => setCode(!code)}>
                    <CodeIcon size={18} />
                </Toggle>
            </ToogleGroup>

            <Separator />

            <ToogleGroup>
                <Toggle>
                    <AlignLeftIcon size={18} />
                </Toggle>

                <Toggle>
                    <AlignCenterIcon size={18} />
                </Toggle>

                <Toggle>
                    <AlignRightIcon size={18} />
                </Toggle>
            </ToogleGroup>

            <Separator />

            <ToogleGroup>
                <Toggle>
                    <ListIcon size={18} />
                </Toggle>

                <Toggle>
                    <ListOrderedIcon size={18} />
                </Toggle>
            </ToogleGroup>

            <Separator />

            <ToogleGroup>
                <Toggle>
                    <Link2Icon size={18} />
                </Toggle>
            </ToogleGroup>

            <Separator />

            {/* <label className='absolute flex items-center gap-2 text-sm text-gray-600 right-4'>
                <UserIcon size={20} />
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </label> */}

        </div>
    )
}

export default Toolbox