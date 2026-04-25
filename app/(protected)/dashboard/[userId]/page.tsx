import { ClientOnlyEditor } from '@/app/ClientOnlyEditor';
import { Room } from '@/app/Room';
import { EditorWrapper } from '@/app/EditorwWrapper';
import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getPagePublicInfo } from '@/server/page/queries';
import AccessDeniedPage from '@/app/accesDenied';
export default async function Page({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { PageId?: string };
}) {
  const session = await auth();
  const { PageId } = await searchParams;
  const pageId = PageId ? Number(PageId) : 0;

  if (!session?.user) {
    redirect('/login');
  }
  if (PageId) {
    if (!Number.isFinite(pageId) || !Number.isInteger(pageId) || pageId < 1) {
      redirect(`/dashboard`);
    }
    const page = await getPagePublicInfo(pageId);
    if (page === null) {
      redirect(`/dashboard`);
    }
  }

  return (
    <Room PageId={PageId}>
      <EditorWrapper>
        <ClientOnlyEditor />
      </EditorWrapper>
    </Room>
  );
}
