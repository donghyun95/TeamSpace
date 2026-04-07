import { Editor } from '../../Editor';
import { Room } from '../../Room';
import { EditorWrapper } from '@/app/EditorwWrapper';
import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getPageAncestorPath } from '@/server/create/queries';
import { ClientOnlyEditor } from '@/app/ClientOnlyEditor';

//initialData 에서 RootPage[] 0번쨰꺼의 데이터를 store에 밀어넣어준다.
export default async function Page({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { PageId?: string };
}) {
  const session = await auth();
  const { userId } = await params;
  const { PageId } = await searchParams;
  console.log(PageId);
  const pageId = PageId ? Number(PageId) : undefined;
  if (PageId) {
    if (!Number.isFinite(pageId) || !Number.isInteger(pageId) || pageId < 1) {
      notFound();
    }
  }

  if (!session?.user || session?.user.id !== userId) {
    notFound();
  }
  //userId랑 PageId 프리즈마 직접확인하고 있으면 통과 없으면 404로 리다이렉트

  //값 수정 해야함 , session.uerId
  //Room id 에 전역에서 선택된 page값 넣어주기
  return (
    <Room PageId={PageId}>
      <EditorWrapper>
        <ClientOnlyEditor />
      </EditorWrapper>
    </Room>
  );
}
