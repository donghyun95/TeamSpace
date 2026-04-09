import { Liveblocks } from '@liveblocks/node';
import { auth } from '@/lib/auth';
import { getUserPageAccess, assertPagePublished } from '@/server/users/queries';

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  const { room } = await req.json();
  const authsession = await auth();
  // ✅ 여기서 유저를 “결정”해야 함 (지금은 더미)
  // 실제 서비스면 session에서 userId 뽑아오면 됨

  const userId = authsession?.user?.id;
  const userName = authsession?.user?.name;
  console.log('auth', authsession);
  const pageId = Number(room);

  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  if (!userId) {
    try {
      assertPagePublished(pageId);
    } catch (error) {
      return new Response('Unauthorized', { status: 403 });
    }
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
  try {
    const identifieduser = await getUserPageAccess(userId, pageId);
    const session = liveblocks.prepareSession(userId, {
      userInfo: {
        name: userName,
        color,
        // avatar: "https://..." // 원하면 추가
      },
    });
    if (identifieduser.role === 'VIEWER') {
      session.allow(room, session.READ_ACCESS);
    } else {
      session.allow(room, session.FULL_ACCESS);
    }
    const { status, body } = await session.authorize();
    return new Response(body, { status });
  } catch (error) {
    return new Response('Unauthorized', { status: 403 });
  }
}
