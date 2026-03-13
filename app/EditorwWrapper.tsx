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

const CursorLayer = memo(function CursorLayer({ propsRect }) {
  const others = useOthers();
  const cursorElements = useMemo(() => {
    // console.log(propsRect);
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
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    scrollWidth: 0,
  });
  const updateMyPresence = useUpdateMyPresence();

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = e.currentTarget; // 현재 이벤트가 걸린 엘리먼트
      const r = el.getBoundingClientRect();
      console.log(r.top + window.scrollY);
      updateMyPresence({
        cursor: {
          x: (e.pageX - r.left) / el.scrollWidth,
          // y: (e.pageY - 56) / r.height,
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
        width: r.width,
        height: r.height,
        left: r.left,
        top: r.top,
        scrollHeight: el.scrollHeight,
        scrollLeft: el.scrollLeft,
        scrollTop: el.scrollTop,
        scrollWidth: el.scrollWidth,
      });
    };

    updateRect();
    console.log(el);
    const observer = new ResizeObserver(updateRect);
    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={contentRef}
      className="relative"
      onPointerMove={handlePointerMove}
    >
      {children}
      {rect && <CursorLayer propsRect={rect} />}
    </div>
  );
}
