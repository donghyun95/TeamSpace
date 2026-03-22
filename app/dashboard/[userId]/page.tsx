import { Room } from '../../Room';
import { Editor } from '../../Editor';

import { EditorWrapper } from '@/app/EditorwWrapper';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    userId: string;
  };
};

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect('./login');
  }
  //값 수정 해야함 , session.uerId
  //workspace:${workspaceId}:page:${pageId}
  return (
    <Room id={session.user.id}>
      <EditorWrapper>
        <Editor />
      </EditorWrapper>
    </Room>
  );
}
