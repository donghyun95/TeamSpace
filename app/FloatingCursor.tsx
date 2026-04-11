type FloatingCursorProps = {
  x: number;
  y: number;
  color?: string; // 여기로 색상 받기
  image?: string;
};

export default function FloatingCursor({
  x,
  y,
  color = '#3b82f6', // 기본값 (적당히 세련된 파랑),
  image,
}: FloatingCursorProps) {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate3d(calc(var(--rect-left) + ${x} * var(--rect-width)), calc(var(--rect-top) + ${y} * var(--rect-height)), 0)`,
        willChange: 'transform',
        transition: 'transform 0.025s linear',
      }}
    >
      <svg
        width="26"
        height="34"
        viewBox="0 0 26 34"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          overflow: 'visible',
          filter:
            'drop-shadow(0 1px 1px rgba(0,0,0,0.22)) drop-shadow(0 4px 10px rgba(0,0,0,0.12))',
        }}
      >
        <defs>
          {/* 색상 기반 그라데이션 */}
          <linearGradient id="cursor-fill" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor={color} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>

        {/* 메인 커서 */}
        <path
          d="M5.2 3.2C5.2 2.4 6.1 1.9 6.8 2.4L21.1 12.4C21.9 13 21.5 14.2 20.5 14.3L14.4 14.7C13.9 14.7 13.4 15 13.2 15.5L10.7 22C10.3 22.9 9 22.9 8.6 22L3.5 4.4C3.4 4 3.5 3.6 3.8 3.4C4.2 3.1 4.7 3 5.2 3.2Z"
          fill="url(#cursor-fill)"
          stroke="#111111"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />

        {/* 하이라이트 (이거 없으면 바로 촌스러워짐) */}
        <path
          d="M6.5 4.8L18.4 13.1L13.5 13.4C12.5 13.5 11.7 14.1 11.3 15L9.5 19.7L5.3 5.4C5.2 5.1 5.3 4.9 5.5 4.8C5.7 4.6 6.1 4.6 6.5 4.8Z"
          fill="rgba(255,255,255,0.55)"
        />
      </svg>
    </div>
  );
}
