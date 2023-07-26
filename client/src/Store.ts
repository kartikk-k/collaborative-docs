import { create } from "zustand";
import InitialData from './Initialdata.json'



/* The code defines an interface `EditorState` which describes the content of the editor state object used in
the editor */
interface EditorState {
    content: {}
    setContent: (content: {}) => void
}

export const useEditorStore = create<EditorState>()((set) => ({
    content: InitialData,
    setContent: (content: {}) => set({ content })
}))


interface ToolboxState {
    bold: boolean
    setBold: (bold: boolean) => void
    italic: boolean
    setItalic: (italic: boolean) => void
    underline: boolean
    setUnderline: (underline: boolean) => void
    strike: boolean
    setStrike: (strike: boolean) => void
    code: boolean
    setCode: (strike: boolean) => void
}

export const useToolboxStore = create<ToolboxState>()((set) => ({
    bold: false,
    setBold: (bold: boolean) => set({ bold }),
    italic: false,
    setItalic: (italic: boolean) => set({ italic }),
    underline: false,
    setUnderline: (underline: boolean) => set({ underline }),
    strike: false,
    setStrike: (strike: boolean) => set({ strike }),
    code: false,
    setCode: (code: boolean) => set({ code })
}))