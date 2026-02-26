import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});
console.log(process.env.LIVEBLOCKS_SECRET_KEY);

export async function POST(req: Request) {
  const { room } = await req.json();

  // ✅ 여기서 유저를 “결정”해야 함 (지금은 더미)
  // 실제 서비스면 session/cookie/JWT에서 userId 뽑아오면 됨
  const userId = `dummy-${Math.floor(Math.random() * 10000)}`;

  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // ✅ 핵심: userInfo로 name/color 넘김
  const session = liveblocks.prepareSession(userId, {
    userInfo: {
      name: userId,
      color,
      // avatar: "https://..." // 원하면 추가
    },
  });

  // ✅ 권한 부여
  session.allow(room, session.FULL_ACCESS);

  // ✅ 토큰 발급
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
