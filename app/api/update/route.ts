import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { updateTitle, updateIcon } from '@/server/create/queries';

export async function PATCH(request: Request) {
  try {
    const body = await request.json(); // 여기서 파싱
    const pageID = Number(body.pageID);
    if (!Number.isInteger(pageID) || pageID <= 0) {
      return NextResponse.json(
        { error: 'INTERNAL_SERVER_ERROR' },
        { status: 500 },
      );
    }
    const title = body.title;
    const icon = body.icon;
    if (title === undefined && icon === undefined)
      return NextResponse.json({ error: '1' }, { status: 400 });
    if (icon === undefined) {
      if (typeof title !== 'string') {
        return NextResponse.json({ error: '2' }, { status: 400 });
      }
      if (title.trim().length === 0) {
        const result = await updateTitle(pageID, 'UnTitled');
        return NextResponse.json(result);
      }
      const result = await updateTitle(pageID, title);
      return NextResponse.json(result);
    }
    if (title === undefined) {
      if (typeof icon !== 'string' || icon.trim().length === 0) {
        return NextResponse.json({ error: '3' }, { status: 400 });
      }
      const result = await updateIcon(pageID, icon);
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    );
  }
}
