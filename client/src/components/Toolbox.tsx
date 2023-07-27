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
    PlusIcon,
    ChevronDownIcon,
    Heading1Icon,
} from 'lucide-react'
import { useToolboxStore } from '@/Store'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddBlockMenu from './AddBlockMenu'

// import { Input } from './ui/input'

function Toolbox() {

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
        textAlign,
        setTextAlign,
        bulletList,
        setBulletList,
        orderedList,
        setOrderedList
    } = useToolboxStore()


    const handleTextAlign = (value: "left" | "center" | "right") => {
        setTextAlign(value)
    }

    return (
        <div className='relative flex items-center h-12 gap-4 p-4 py-2 overflow-x-auto overflow-y-hidden text-gray-600 bg-gray-100 border-b'>

            {/* <AddBlockMenu />

            <Separator /> */}

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
                <Toggle pressed={textAlign === "left"} onClick={() => handleTextAlign("left")}>
                    <AlignLeftIcon size={18} />
                </Toggle>

                <Toggle pressed={textAlign === "center"} onClick={() => handleTextAlign("center")}>
                    <AlignCenterIcon size={18} />
                </Toggle>

                <Toggle pressed={textAlign === "right"} onClick={() => handleTextAlign("right")}>
                    <AlignRightIcon size={18} />
                </Toggle>
            </ToogleGroup>

            <Separator />

            <ToogleGroup>
                <Toggle pressed={bulletList} onClick={() => setBulletList(!bulletList)}>
                    <ListIcon size={18} />
                </Toggle>

                <Toggle pressed={orderedList} onClick={() => setOrderedList(!orderedList)}>
                    <ListOrderedIcon size={18} />
                </Toggle>
            </ToogleGroup>

            <Separator />

            <ToogleGroup>
                <Toggle>
                    <Link2Icon size={18} />
                </Toggle>
            </ToogleGroup>

        </div>
    )
}

export default Toolbox