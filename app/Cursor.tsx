"use client";

import { useEffect, useRef } from "react";
import { useMyPresence, useOthers } from "@liveblocks/react/suspense";

type Props = { x: number; y: number };

function CursorUI({ x, y }: Props) {
  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px)`,
        pointerEvents: "none",
        willChange: "transform",
      }}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m13.67 6.03-11-4a.5.5 0 0 0-.64.64l4 11a.5.5 0 0 0 .935.015l1.92-4.8 4.8-1.92a.5.5 0 0 0 0-.935h-.015Z"
        fill="#000"
      />
    </svg>
  );
}

export function Cursor() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  const [, updateMyPresence] = useMyPresence();
  const others = useOthers();

  // 최신 좌표/inside 상태를 렌더 없이 저장
  const latestRef = useRef({ x: 0, y: 0, inside: false });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const flush = () => {
      rafRef.current = 0;

      const { x, y, inside } = latestRef.current;
      updateMyPresence({
        cursor: inside ? { x, y } : null,
      });
    };

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(flush);
    };

    const onMove = (e: PointerEvent) => {
      const rect = boxRef.current?.getBoundingClientRect();
      if (!rect) return;

      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      const inside =
        localX >= 0 &&
        localY >= 0 &&
        localX <= rect.width &&
        localY <= rect.height;

      if (!inside) {
        // 밖이면 presence cursor는 null로 (렌더도 안 보이게 됨)
        latestRef.current.inside = false;
        schedule();
        return;
      }

      latestRef.current.inside = true;
      latestRef.current.x = Math.floor(localX);
      latestRef.current.y = Math.floor(localY);

      schedule();
    };

    const onLeaveWindow = () => {
      // 브라우저 밖으로 나가거나 탭 벗어나면 정리
      latestRef.current.inside = false;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeaveWindow);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateMyPresence]);

  return (
    <div
      ref={boxRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative", // absolute 커서들의 기준
        overflow: "hidden", // 바깥으로 나가면 안 보이게
      }}
    >
      {/* 내 커서도 보여주고 싶으면 myPresence에서 읽어서 렌더 */}
      {/* 예: myPresence.cursor && <CursorUI ... /> */}

      {others
        .filter((o) => o.presence?.cursor)
        .map(({ connectionId, presence }) => (
          <CursorUI
            key={connectionId}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
          />
        ))}
    </div>
  );
}
