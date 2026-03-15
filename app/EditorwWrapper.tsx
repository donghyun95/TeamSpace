'use client';

import { useUpdateMyPresence, useOthers } from '@liveblocks/react/suspense';
import {
  ReactNode,
  useRef,
  memo,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import FloatingCursor from './FloatingCursor';
import { PopOverEmoticon } from './PopOverEmoticon';

const CursorLayer = memo(function CursorLayer({ propsRect }) {
  const others = useOthers();
  const cursorElements = useMemo(() => {
    return others
      .filter((other) => other.presence.cursor != null)
      .map(({ connectionId, presence }) => (
        <FloatingCursor
          key={connectionId}
          x={presence.cursor!.x}
          y={presence.cursor!.y * propsRect.height}
        />
      ));
  }, [others, propsRect]);

  return <>{cursorElements}</>;
});

export function EditorWrapper({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState({
    height: 0,
  });

  const updateMyPresence = useUpdateMyPresence();

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = e.currentTarget; // 현재 이벤트가 걸린 엘리먼트
      const r = el.getBoundingClientRect();
      console.log(rect.height);
      updateMyPresence({
        cursor: {
          x: (e.pageX - r.left) / el.scrollWidth,
          y: (e.clientY - r.top) / r.height,
        },
      });
    },
    [updateMyPresence, rect],
  );

  const handlePointerLeave = useCallback(() => {
    updateMyPresence({ cursor: null });
  }, [updateMyPresence]);

  useEffect(() => {
    // if (!contentRef.current) return;
    const el = contentRef.current;
    const updateRect = () => {
      // if (!el) return;
      const r = contentRef.current!.getBoundingClientRect();

      setRect({
        height: r.height,
      });
    };

    updateRect();
    const observer = new ResizeObserver(updateRect);
    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={contentRef}
      className="relative page"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <PopOverEmoticon></PopOverEmoticon>
      {children}
      {rect && <CursorLayer propsRect={rect} />}
    </div>
  );
}
