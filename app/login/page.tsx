import { auth } from '../../lib/auth';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/app/login/login-form';

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <LoginForm />;
  }

  redirect(`/dashboard/${userId}`);
}
