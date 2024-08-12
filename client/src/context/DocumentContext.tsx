import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Document {
  id: string;
  title: string;
  content: string;
}

interface DocumentContextType {
  documents: Document[];
  addDocument: (document: Document) => void;
  removeDocument: (id: string) => void;
  updateDocument: (document: Document) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const addDocument = (newDocument: Document) => {
    setDocuments(prevDocuments => [...prevDocuments, newDocument]);
  };

  const removeDocument = (id: string) => {
    setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== id));
  };

  const updateDocument = (updatedDocument: Document) => {
    setDocuments(prevDocuments => prevDocuments.map(doc => doc.id === updatedDocument.id ? updatedDocument : doc));
  };

  return (
    <DocumentContext.Provider value={{ documents, addDocument, removeDocument, updateDocument }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};