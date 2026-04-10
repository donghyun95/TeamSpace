'use client';
import { useEffect, useMemo, useRef, useContext } from 'react';
import { BlockNoteView } from '@/node_modules/@blocknote/react/mantine/types/src';
import { Threads } from './Threads';

import { TitleInput } from './TitleInput';
import { useEditor } from './EditorProvider';

export function Editor({ role }) {
  const editor = useEditor();
  return (
    <BlockNoteView
      editor={editor}
      className={`editor`}
      editable={role === 'VIEWER' ? false : true}
      onChange={(editor, { getChanges }) => {
        const changes = getChanges();
        console.log(editor.document);
      }}
    />
  );
}
//
