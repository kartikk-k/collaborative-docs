import { create } from "zustand";
import InitialData from '../Initialdata.json'

interface EditorState {
    content: {}
}

type PartialEditorState = Partial<EditorState>;

export const useEditorStore = create<EditorState & { setState: (state: PartialEditorState) => void }>()((set) => ({
    content: InitialData,
    setState: (state: PartialEditorState) => set((prevState) => ({ ...prevState, ...state })),
}))

// Toolbox state manager for actions like bold, italic, and more
interface ToolboxState {
    bold: boolean
    italic: boolean
    underline: boolean
    strike: boolean
    code: boolean
    textAlign: "left" | "center" | "right" | undefined
    bulletList: boolean
    orderedList: boolean
}

export const useToolboxStore = create<ToolboxState & { setState: (state: Partial<ToolboxState>) => void }>()((set) => ({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    code: false,
    textAlign: "left",
    bulletList: false,
    orderedList: false,
    setState: (state: Partial<ToolboxState>) => set((prevState) => ({ ...prevState, ...state })),
}))