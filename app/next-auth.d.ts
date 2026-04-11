import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      color?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    color?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    color?: string | null;
  }
}
