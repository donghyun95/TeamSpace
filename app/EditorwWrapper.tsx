import { ReactNode } from 'react';

import { PopOverEmoticon } from './PopOverEmoticon';

export function EditorWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative page">
      <PopOverEmoticon />
      {children}
    </div>
  );
}
