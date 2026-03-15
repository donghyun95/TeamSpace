'use client';

import { BlockNoteView } from '@blocknote/mantine';
import { Threads } from './Threads';
import { useEffect, useState, useRef } from 'react';
import { EditorProvider, useEditor } from './EditorProvider';
export function Editor() {
  const editor = useEditor();
  console.log('editor 함수 실행함');
  return (
    <BlockNoteView
      editor={editor}
      className="editor"
      editable={true}
      onChange={(editor, { getChanges }) => {
        const changes = getChanges();
        // console.log('current content:', JSON.stringify(editor.document));
      }}
    />
  );
}
