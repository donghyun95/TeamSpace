'use client';
import { signOut } from 'next-auth/react';

import { Room } from '../Room';
import { EditorWrapper } from '../EditorwWrapper';
import { Editor } from '../Editor';
import { useState } from 'react';
export function Playground({ params }: any) {
  const [c, SetC] = useState('13');
  function logout(ev) {
    signOut({ callbackUrl: '/login' });
  }
  function change(ev) {
    if (c === '13') {
      SetC('28');
    }
    SetC('13');
  }
  return (
    <div>
      <button onClick={logout}>로그아웃</button>

      <button onClick={change}>페이지변경</button>

      <Room PageId={String(c)}>
        <EditorWrapper>
          <Editor />
        </EditorWrapper>
      </Room>
    </div>
  );
}
