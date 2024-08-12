import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditorState {
  content: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  code: boolean;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  bulletList: boolean;
  orderedList: boolean;
}

interface EditorContextType extends EditorState {
  setContent: (content: string) => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  toggleStrike: () => void;
  toggleCode: () => void;
  setTextAlign: (align: 'left' | 'center' | 'right' | 'justify') => void;
  toggleBulletList: () => void;
  toggleOrderedList: () => void;
}

const defaultState: EditorState = {
  content: '',
  bold: false,
  italic: false,
  underline: false,
  strike: false,
  code: false,
  textAlign: 'left',
  bulletList: false,
  orderedList: false,
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [editorState, setEditorState] = useState<EditorState>(defaultState);

  const setContent = (content: string) => setEditorState(prev => ({ ...prev, content }));
  const toggleBold = () => setEditorState(prev => ({ ...prev, bold: !prev.bold }));
  const toggleItalic = () => setEditorState(prev => ({ ...prev, italic: !prev.italic }));
  const toggleUnderline = () => setEditorState(prev => ({ ...prev, underline: !prev.underline }));
  const toggleStrike = () => setEditorState(prev => ({ ...prev, strike: !prev.strike }));
  const toggleCode = () => setEditorState(prev => ({ ...prev, code: !prev.code }));
  const setTextAlign = (textAlign: 'left' | 'center' | 'right' | 'justify') => setEditorState(prev => ({ ...prev, textAlign }));
  const toggleBulletList = () => setEditorState(prev => ({ ...prev, bulletList: !prev.bulletList }));
  const toggleOrderedList = () => setEditorState(prev => ({ ...prev, orderedList: !prev.orderedList }));

  return (
    <EditorContext.Provider value={{
      ...editorState,
      setContent,
      toggleBold,
      toggleItalic,
      toggleUnderline,
      toggleStrike,
      toggleCode,
      setTextAlign,
      toggleBulletList,
      toggleOrderedList,
    }}>
      {children}
    </EditorContext.Provider>
  );
};

const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

export { EditorProvider, useEditor };