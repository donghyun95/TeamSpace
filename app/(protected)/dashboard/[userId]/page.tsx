import { ClientOnlyEditor } from '@/app/ClientOnlyEditor';
import { Room } from '@/app/Room';
import { EditorWrapper } from '@/app/EditorwWrapper';
import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { TrashView } from './TrashView';
export default async function Page({
  searchParams,
}: {
  params: { userId: string };
  searchParams: { PageId?: string; view?: string; workspaceId?: string };
}) {
  const session = await auth();
  const { PageId, view, workspaceId } = await searchParams;
  const pageId = PageId ? Number(PageId) : 0;
  const parsedWorkspaceId = workspaceId ? Number(workspaceId) : undefined;
  if (PageId) {
    if (!Number.isFinite(pageId) || !Number.isInteger(pageId) || pageId < 1) {
      notFound();
    }
  }

  if (!session?.user) {
    redirect('/login');
  }

  if (view === 'trash') {
    return (
      <EditorWrapper>
        <TrashView initialWorkspaceId={parsedWorkspaceId} />
      </EditorWrapper>
    );
  }

  return (
    <Room PageId={PageId}>
      <EditorWrapper>
        <ClientOnlyEditor />
      </EditorWrapper>
    </Room>
  );
}
