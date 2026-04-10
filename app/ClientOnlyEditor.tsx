'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./Editor').then((m) => m.Editor), {
  ssr: false,
});

export function ClientOnlyEditor({ role }) {
  return <Editor role={role} />;
}
