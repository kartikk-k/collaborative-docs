import { useState } from 'react';

interface Document {
  id: string;
  title: string;
  content: string;
}

interface Tab {
  documentId: string;
  title: string;
}

const MultiTabManager = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const addDocument = (title: string, content: string) => {
    const newDocument: Document = {
      id: Date.now().toString(),
      title,
      content,
    };
    setDocuments([...documents, newDocument]);
    addTab(newDocument.id, newDocument.title);
  };

  const addTab = (documentId: string, title: string) => {
    const newTab: Tab = {
      documentId,
      title,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.documentId);
  };

  const switchTab = (documentId: string) => {
    setActiveTabId(documentId);
  };

  const closeTab = (documentId: string) => {
    const updatedTabs = tabs.filter(tab => tab.documentId !== documentId);
    setTabs(updatedTabs);
    if (activeTabId === documentId) {
      setActiveTabId(updatedTabs.length > 0 ? updatedTabs[0].documentId : null);
    }
  };

  const getActiveDocument = () => {
    if (!activeTabId) return null;
    return documents.find(doc => doc.id === activeTabId) || null;
  };

  const renderTabs = () => {
    return tabs.map(tab => (
      <div key={tab.documentId} onClick={() => switchTab(tab.documentId)}>
        {tab.title} <button onClick={() => closeTab(tab.documentId)}>x</button>
      </div>
    ));
  };

  const renderActiveDocument = () => {
    const activeDocument = getActiveDocument();
    if (!activeDocument) return <div>No document selected</div>;
    return (
      <div>
        <h1>{activeDocument.title}</h1>
        <p>{activeDocument.content}</p>
      </div>
    );
  };

  return (
    <div>
      <button onClick={() => addDocument('New Document', 'Start typing here...')}>Add Document</button>
      <div>{renderTabs()}</div>
      <div>{renderActiveDocument()}</div>
    </div>
  );
};

export default MultiTabManager;