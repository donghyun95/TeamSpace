import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { createWorkSpace } from '@/server/create/queries';
import { getPagePublicInfo, togglePublishPage } from '@/server/page/queries';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageIdParam = searchParams.get('pageId');
    const pageId = Number(pageIdParam);
    if (!pageIdParam || isNaN(pageId)) {
      return NextResponse.json({ error: 'INVALID_PAGE_ID' }, { status: 400 });
    }
    if (!pageId) {
      return NextResponse.json({ error: 'INVALID_PAGE_ID' }, { status: 400 });
    }
    const result = await getPagePublicInfo(pageId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const pageId = Number(body.pageId);

    if (!body.pageId || isNaN(pageId)) {
      return NextResponse.json({ error: 'INVALID_PAGE_ID' }, { status: 400 });
    }

    const result = await togglePublishPage(pageId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    );
  }
}
