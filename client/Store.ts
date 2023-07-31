import { create } from "zustand";
import { DocumentType } from "./typings";


interface DocumentStoreType {
    documents: DocumentType[];
    setDocumets: (documents: DocumentType[]) => void;
}

export const useDocmentsStore = create<DocumentStoreType>((set) => ({
    documents: [],
    setDocumets: (documents: DocumentType[]) => set({ documents })
}))