import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SyntaxHighlighterProps {
  language: string;
  code: string;
}

const supportedLanguages = ['javascript', 'python', 'java', 'csharp', 'ruby'];

const EditorSyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({ language, code }) => {
  const isLanguageSupported = supportedLanguages.includes(language);

  if (!isLanguageSupported) {
    console.error(`The language ${language} is not supported for syntax highlighting.`);
    return <div>Unsupported language for syntax highlighting.</div>;
  }

  return (
    <SyntaxHighlighter language={language} style={tomorrow}>
      {code}
    </SyntaxHighlighter>
  );
};

export default EditorSyntaxHighlighter;