import { auth } from '@/lib/auth';
import { getUserPersonalRootPages } from '@/server/users/queries';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = session.user;
  if (!user.id) {
    redirect('/login');
  }
  const rootPages = await getUserPersonalRootPages(user.id);
  redirect(`/dashboard/${user.id}/?PageId=${rootPages[0]?.id}`);
}
