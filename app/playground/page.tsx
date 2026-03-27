'use client';

import { Playground } from './playground';
import { signOut } from 'next-auth/react';
export default function Page({ params }: any) {
  function logout(ev) {
    signOut({ callbackUrl: '/login' });
  }
  return <button onClick={logout}>로그아웃</button>;
}
