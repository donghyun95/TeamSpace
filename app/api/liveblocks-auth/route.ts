import { Liveblocks } from '@liveblocks/node';
import { auth } from '@/lib/auth';
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  const { room } = await req.json();
  const authsession = await auth();
  // ✅ 여기서 유저를 “결정”해야 함 (지금은 더미)
  // 실제 서비스면 session에서 userId 뽑아오면 됨
  console.log(authsession);
  const userId = authsession?.user?.name;

  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  if (!userId) {
    const guest = `guest-${crypto.randomUUID()}`;
    const session = liveblocks.prepareSession(guest, {
      userInfo: {
        name: guest,
        color,
        // avatar: "https://..." // 원하면 추가
      },
    });
    session.allow(room, session.READ_ACCESS);
    const { status, body } = await session.authorize();
    return new Response(body, { status });
  }
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
