'use client';

import { useEffect, useState } from 'react';

type Pos = {
  x: number;
  y: number;
};

export default function FloatingCursor({ x, y }: any) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: y,
        width: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translateY(-50%)',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '24px',
          background: 'rgba(59, 130, 246, 0.15)',
          borderTop: '1px solid rgba(59, 130, 246, 0.8)',
          borderBottom: '1px solid rgba(59, 130, 246, 0.8)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '8px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '9999px',
            background: 'rgba(59, 130, 246, 1)',
            marginRight: '8px',
          }}
        />
        <span
          style={{
            fontSize: '12px',
            color: '#1d4ed8',
            fontWeight: 600,
          }}
        >
          다른 사용자의 위치
        </span>
      </div>
    </div>
  );
}

// export default function FloatingCursor({ x, y }: Pos) {
//   return (
//     <div
//       style={{
//         position: 'absolute',
//         // left: `${x * 100}%`,
//         top: y,
//         pointerEvents: 'none',
//         zIndex: 9999,
//         transform: `translate(2px, 2px)`,
//       }}
//     >
//       <svg
//         width="100%"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M5 3L18 14H11L8 21L5 3Z"
//           fill="black"
//           stroke="white"
//           strokeWidth="1.5"
//           strokeLinejoin="round"
//         />
//       </svg>
//     </div>
//   );
// }
