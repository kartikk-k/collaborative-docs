import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToolboxState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  code: boolean;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  bulletList: boolean;
  orderedList: boolean;
}

interface ToolboxContextType extends ToolboxState {
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  toggleStrike: () => void;
  toggleCode: () => void;
  setTextAlign: (align: 'left' | 'center' | 'right' | 'justify') => void;
  toggleBulletList: () => void;
  toggleOrderedList: () => void;
}

const defaultState: ToolboxState = {
  bold: false,
  italic: false,
  underline: false,
  strike: false,
  code: false,
  textAlign: 'left',
  bulletList: false,
  orderedList: false,
};

const ToolboxContext = createContext<ToolboxContextType | undefined>(undefined);

const ToolboxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ToolboxState>(defaultState);

  const toggleBold = () => setState({ ...state, bold: !state.bold });
  const toggleItalic = () => setState({ ...state, italic: !state.italic });
  const toggleUnderline = () => setState({ ...state, underline: !state.underline });
  const toggleStrike = () => setState({ ...state, strike: !state.strike });
  const toggleCode = () => setState({ ...state, code: !state.code });
  const setTextAlign = (textAlign: 'left' | 'center' | 'right' | 'justify') => setState({ ...state, textAlign });
  const toggleBulletList = () => setState({ ...state, bulletList: !state.bulletList });
  const toggleOrderedList = () => setState({ ...state, orderedList: !state.orderedList });

  return (
    <ToolboxContext.Provider value={{
      ...state,
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
    </ToolboxContext.Provider>
  );
};

const useToolbox = () => {
  const context = useContext(ToolboxContext);
  if (!context) {
    throw new Error('useToolbox must be used within a ToolboxProvider');
  }
  return context;
};

export { ToolboxProvider, useToolbox };