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
import { useToolboxStore } from '@/store/EditorStore'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddBlockMenu from './AddBlockMenu'
import { useActiveDocumentStore } from '@/store/DocumentStore'

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

    const { isEditable, isFetching } = useActiveDocumentStore()

    // disables editor actions if document is not editable due to share settings or if document is loading
    const disabled = !isEditable || isFetching

    // handles text alignment
    const handleTextAlign = (value: "left" | "center" | "right") => {
        setTextAlign(value)
    }

    return (
        <div className='relative flex items-center h-12 gap-4 p-4 py-2 overflow-x-auto overflow-y-hidden text-gray-600 bg-gray-100 border-b'>

            {/* <AddBlockMenu />

            <Separator /> */}

            {/* text-styling options */}
            <ToogleGroup>
                <Toggle disabled={disabled} pressed={bold} onClick={() => setBold(!bold)}>
                    <BoldIcon size={18} />
                </Toggle>

                <Toggle disabled={disabled} pressed={underline} onClick={() => setUnderline(!underline)}>
                    <UnderlineIcon size={18} />
                </Toggle>

                <Toggle disabled={disabled} pressed={italic} onClick={() => setItalic(!italic)}>
                    <ItalicIcon size={18} />
                </Toggle>

                <Toggle disabled={disabled} pressed={strike} onClick={() => setStrike(!strike)}>
                    <StrikethroughIcon size={18} />
                </Toggle>

                <Toggle disabled={disabled} pressed={code} onClick={() => setCode(!code)}>
                    <CodeIcon size={18} />
                </Toggle>
            </ToogleGroup>

            <Separator />

            {/* text-alignment options */}
            <ToogleGroup>
                <Toggle disabled={disabled} pressed={textAlign === "left"} onClick={() => handleTextAlign("left")}>
                    <AlignLeftIcon size={18} />
                </Toggle>

                <Toggle disabled={disabled} pressed={textAlign === "center"} onClick={() => handleTextAlign("center")}>
                    <AlignCenterIcon size={18} />
                </Toggle>

                <Toggle disabled={disabled} pressed={textAlign === "right"} onClick={() => handleTextAlign("right")}>
                    <AlignRightIcon size={18} />
                </Toggle>
            </ToogleGroup>

            <Separator />

            {/* list view options */}
            <ToogleGroup>
                <Toggle disabled={disabled} pressed={bulletList} onClick={() => setBulletList(!bulletList)}>
                    <ListIcon size={18} />
                </Toggle>

                <Toggle disabled={disabled} pressed={orderedList} onClick={() => setOrderedList(!orderedList)}>
                    <ListOrderedIcon size={18} />
                </Toggle>
            </ToogleGroup>

            <Separator />

            <ToogleGroup>
                <Toggle disabled={disabled}>
                    <Link2Icon size={18} />
                </Toggle>
            </ToogleGroup>

        </div>
    )
}

export default Toolbox