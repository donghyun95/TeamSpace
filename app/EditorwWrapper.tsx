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
  useLayoutEffect,
} from 'react';
import FloatingCursor from './FloatingCursor';
import { PopOverEmoticon } from './PopOverEmoticon';
import { useSelectedData } from './Providers/ClientDataProvider';

import { useCreateBlockNote } from '@blocknote/react';
import { getSelfandChildrenFetch } from '@/lib/api/getSelfandChildrenFetch';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BlockNoteView } from '@/node_modules/@blocknote/react/mantine/types/src';
import { TitleInput } from './TitleInput';

import { ClientOnlyEditor } from './ClientOnlyEditor';
function throttle<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

const CursorLayer = memo(function CursorLayer({ propsRect }) {
  const others = useOthers();

  const cursorElements = useMemo(() => {
    return others
      .filter((other) => other.presence.cursor != null)
      .map(({ connectionId, presence }) => (
        <FloatingCursor
          key={connectionId}
          x={presence.cursor!.x * propsRect.width + propsRect.left}
          y={presence.cursor!.y * propsRect.height + propsRect.top}
        />
      ));
  }, [others, propsRect]);
  if (others.length === 0) return <></>;
  return <>{cursorElements}</>;
});

export function EditorWrapper() {
  const isCursorOn = useSelectedData((state) => state.isCursorOn);
  const setisCursorOn = useSelectedData((state) => state.setisCursorOn);
  const pageNodeID = useSelectedData((state) => state.pageNodeID);
  const { data: selfAndChildren = { self: {}, children: [] } } = useQuery({
    queryKey: ['page', Number(pageNodeID)],
    queryFn: () => getSelfandChildrenFetch(String(pageNodeID)),
    staleTime: 0,
    enabled: true,
  });

  // const ready = useIsEditorReady();
  const contentRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
  const role = selfAndChildren.self?.role;
  const updateMyPresence = useUpdateMyPresence();

  const throttledUpdate = useMemo(
    () =>
      throttle((x: number, y: number) => {
        updateMyPresence({
          cursor: { x, y },
        });
      }, 50),
    [updateMyPresence],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();

      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      throttledUpdate(x, y);
    },
    [throttledUpdate],
  );
  const handlePointerLeave = useCallback(() => {
    updateMyPresence({ cursor: null });
  }, [updateMyPresence]);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    let frame = null;

    const updateRect = () => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();

        setRect((prev) => {
          if (
            prev.width === r.width &&
            prev.height === r.height &&
            prev.left === r.left &&
            prev.top === r.top
          ) {
            return prev;
          }

          return {
            width: r.width,
            height: r.height,
            left: r.left,
            top: r.top,
          };
        });

        frame = null;
      });
    };

    updateRect();

    const observer = new ResizeObserver(updateRect);
    observer.observe(el);

    window.addEventListener('scroll', updateRect);
    window.addEventListener('resize', updateRect);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('resize', updateRect);
    };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isCursorOn) setisCursorOn(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setisCursorOn]);
  return (
    <>
      <div className="relative page">
        <PopOverEmoticon />
        <TitleInput />
        <div
          ref={contentRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="mx-auto w-[800px] relative"
        >
          <ClientOnlyEditor role={role} />
        </div>
      </div>
      {isCursorOn && <CursorLayer propsRect={rect} />}
    </>
  );
}
