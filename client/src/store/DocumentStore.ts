import { create } from "zustand";
import { DocumentType } from "../../typings";


// This is the store for the documents
interface DocumentsStoreType {
    documents: DocumentType[];
    setDocumets: (documents: DocumentType[]) => void;
}

export const useDocmentsStore = create<DocumentsStoreType>((set) => ({
    documents: [],
    setDocumets: (documents: DocumentType[]) => set({ documents })
}))


// This is the store for the active document
interface ActiveDocumentStoreType {
    isFetching: boolean;
    setIsFetching: (isFetching: boolean) => void;
    isEditable: boolean;
    setIsEditable: (isEditable: boolean) => void;
    activeDocument: DocumentType | null;
    setActiveDocument: (document: DocumentType) => void;
    collobrativeMode: boolean;
    setCollobrativeMode: (mode: boolean) => void;
}

export const useActiveDocumentStore = create<ActiveDocumentStoreType>((set) => ({
    isFetching: true,
    setIsFetching: (isFetching: boolean) => set({ isFetching }),
    isEditable: false,
    setIsEditable: (isEditable: boolean) => set({ isEditable }),
    activeDocument: null,
    setActiveDocument: (document: DocumentType) => set({ activeDocument: document }),
    collobrativeMode: false,
    setCollobrativeMode: (mode: boolean) => set({ collobrativeMode: mode })
}))
