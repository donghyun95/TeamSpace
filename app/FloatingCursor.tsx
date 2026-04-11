type FloatingCursorProps = {
  x: number;
  y: number;
  color?: string; // 색상 받기
  image?: string; // 이미지 URL 받기
};

export default function FloatingCursor({
  x,
  y,
  color = '#3b82f6', // 기본값 (적당히 세련된 파랑)
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
        // 기존 계산 로직 그대로 유지
        transform: `translate3d(calc(var(--rect-left) + ${x} * var(--rect-width)), calc(var(--rect-top) + ${y} * var(--rect-height)), 0)`,
        willChange: 'transform',
        transition: 'transform 0.025s linear',
        // --- 추가: 커서 오프셋 조정 (시각적 포인트가 좌표와 일치하도록) ---
        // 기존 SVG의 대략적인 포인트 위치(5px, 3px)만큼 음수 마진을 주어 보정합니다.
        marginLeft: '-5px',
        marginTop: '-3px',
      }}
    >
      {/* --- 기존 SVG 커서 --- */}
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
          {/* 색상 기반 그라데이션 (동일) */}
          <linearGradient id="cursor-fill" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor={color} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>

        {/* 메인 커서 (동일) */}
        <path
          d="M5.2 3.2C5.2 2.4 6.1 1.9 6.8 2.4L21.1 12.4C21.9 13 21.5 14.2 20.5 14.3L14.4 14.7C13.9 14.7 13.4 15 13.2 15.5L10.7 22C10.3 22.9 9 22.9 8.6 22L3.5 4.4C3.4 4 3.5 3.6 3.8 3.4C4.2 3.1 4.7 3 5.2 3.2Z"
          fill="url(#cursor-fill)"
          stroke="#111111"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />

        {/* 하이라이트 (동일) */}
        <path
          d="M6.5 4.8L18.4 13.1L13.5 13.4C12.5 13.5 11.7 14.1 11.3 15L9.5 19.7L5.3 5.4C5.2 5.1 5.3 4.9 5.5 4.8C5.7 4.6 6.1 4.6 6.5 4.8Z"
          fill="rgba(255,255,255,0.55)"
        />
      </svg>

      {/* --- 추가: 커서 아래 사용자 이미지(아바타) --- */}
      {image && (
        <div
          style={{
            position: 'absolute', // 커서 전체 div 기준 절대 위치
            // 커서 포인트에서 오른쪽 하단으로 오프셋을 둡니다.
            top: '20px',
            left: '12px',
            width: '28px', // 적절한 아바타 크기
            height: '28px',
            borderRadius: '50%', // 원형으로 자르기
            overflow: 'hidden', // 이미지가 영역 밖으로 나가지 않도록
            border: `2px solid ${color}`, // 사용자 색상으로 테두리
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)', // 세련된 그림자 효과
            // background-image로 이미지를 설정하면 비율 유지가 쉽습니다.
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#ddd', // 이미지가 로드되지 않을 때의 기본 배경색
          }}
        />
      )}
    </div>
  );
}
