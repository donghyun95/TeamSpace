'use client';

import {
  useUpdateMyPresence,
  useOthers,
  useOthersMapped,
} from '@liveblocks/react/suspense';
import {
  ReactNode,
  useRef,
  memo,
  useMemo,
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from 'react';
import FloatingCursor from './FloatingCursor';
import { PopOverEmoticon } from './PopOverEmoticon';

const CursorLayer = memo(function CursorLayer({ propsRect, show }) {
  if (!show) return;
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
  if (others.length === 0) return <></>;
  return <>{cursorElements}</>;
});

export function EditorWrapper({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState({
    height: 0,
  });
  const [showCursorLayer, setShowCursorLayer] = useState(false);
  const updateMyPresence = useUpdateMyPresence();

  const lastSentRef = useRef(0);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const now = performance.now();

      // 200ms = 초당 5번
      if (now - lastSentRef.current < 200) return;

      lastSentRef.current = now;

      const el = e.currentTarget;
      const r = el.getBoundingClientRect();

      updateMyPresence({
        cursor: {
          x: (e.clientX - r.left) / r.width,
          y: (e.clientY - r.top) / r.height,
        },
      });
    },
    [updateMyPresence],
  );

  useLayoutEffect(() => {
    // if (!contentRef.current) return;
    const el = contentRef.current;
    const updateRect = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();

      setRect({
        height: r.height,
      });
    };

    updateRect();
    const observer = new ResizeObserver(updateRect);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setShowCursorLayer(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      ref={contentRef}
      className="relative page"
      onPointerMove={handlePointerMove}
    >
      <PopOverEmoticon />
      {children}
      {/* <CursorLayer propsRect={rect} show={showCursorLayer} /> */}
    </div>
  );
}
