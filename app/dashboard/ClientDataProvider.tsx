'use client';

import { useState, useContext, createContext } from 'react';

type InitialDataContextType = {
  PageNodeID: string;
  setPageNodeID: (v: string) => void;
};

export const SelectedData = createContext<InitialDataContextType | null>(null);

export function ClientDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [PageNodeID, setPageNodeID] = useState('');

  return (
    <SelectedData.Provider value={{ PageNodeID, setPageNodeID }}>
      {children}
    </SelectedData.Provider>
  );
}
export function useSelectedData() {
  const context = useContext(SelectedData);

  if (!context) {
    throw new Error('useTitle must be used within TitleProvider');
  }

  return context;
}
