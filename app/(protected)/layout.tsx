import { auth } from '@/lib/auth';
import Providers from '../Providers/queryProviders';

export default async function RootLayout({ children }) {
  const session = await auth();

  return <Providers session={session}>{children}</Providers>;
}
