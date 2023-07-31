import { create } from "zustand";
import InitialData from '../Initialdata.json'



/* The `interface UserState` is defining the shape of the state object for managing user-related data.
It includes the following properties: */
interface UserState {
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
    email: string | null
    setEmail: (email: string) => void
    userId: string | null
    setUserId: (userId: string) => void
}

/* The code is creating a custom hook called `useUserStore` using the `create` function from the
`zustand` library. */
export const useUserStore = create<UserState>()((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    email: null,
    setEmail: (email: string) => set({ email }),
    userId: null,
    setUserId: (userId: string) => set({ userId })
}))



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



// Toolbox state manager for actions like bold, italic, and more
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
    textAlign: "left" | "center" | "right" | undefined
    setTextAlign: (textAlign: "left" | "center" | "right" | undefined) => void
    bulletList: boolean
    setBulletList: (bulletList: boolean) => void
    orderedList: boolean
    setOrderedList: (orderedList: boolean) => void
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
    setCode: (code: boolean) => set({ code }),
    textAlign: "left",
    setTextAlign: (textAlign: "left" | "center" | "right" | undefined) => set({ textAlign }),
    bulletList: false,
    setBulletList: (bulletList: boolean) => set({ bulletList }),
    orderedList: false,
    setOrderedList: (orderedList: boolean) => set({ orderedList }),
}))