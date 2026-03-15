import { createContext, useContext } from 'react';
import { Editor } from './Editor';

export const EditorContext = createContext(null);

export function useEditor() {
  const editor = useContext(EditorContext);

  if (!editor) {
    throw new Error('useEditor must be used within EditorProvider');
  }

  return editor;
}
