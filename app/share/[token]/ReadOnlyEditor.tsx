'use client';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNoteWithLiveblocks } from '@liveblocks/react-blocknote';

export function ReadOnlyEditor({ pagenodeID }: { pagenodeID: number }) {
  const editor = useCreateBlockNoteWithLiveblocks();
  return (
    <BlockNoteView
      editor={editor}
      className={`editor`}
      editable={false}
      onChange={(editor, { getChanges }) => {
        const changes = getChanges();
      }}
    />
  );
}
