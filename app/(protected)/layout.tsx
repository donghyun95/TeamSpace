import { auth } from '@/lib/auth';
import Providers from '../Providers/queryProviders';
import { LiveblocksProviders } from '../Providers/liveblocksProvider';
import { SelectedDataProvider } from '../Providers/ClientDataProvider';
import { getSidebarData } from '@/server/users/queries';
import { redirect } from 'next/navigation';
export default async function RootLayout({ children }) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return redirect('/login');
  }
  const sidebarData = await getSidebarData(session?.user?.id);
  return (
    <Providers session={session}>
      <SelectedDataProvider initialPage={sidebarData}>
        <LiveblocksProviders>{children}</LiveblocksProviders>
      </SelectedDataProvider>
    </Providers>
  );
}
