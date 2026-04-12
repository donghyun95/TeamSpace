'use client';

import { getSelfandChildrenFetch } from '@/lib/api/getSelfandChildrenFetch';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { useSelectedData } from './Providers/ClientDataProvider';
import { useQuery } from '@tanstack/react-query';

const Editor = dynamic(() => import('./Editor').then((m) => m.Editor), {
  ssr: false,
});

export function ClientOnlyEditor() {
  const pageNodeID = useSelectedData((state) => state.pageNodeID);
  // console.log('페이지', pageNodeID);
  const { data: selfAndChildren = { self: {}, children: [] } } = useQuery({
    queryKey: ['page', Number(pageNodeID)],
    queryFn: () => getSelfandChildrenFetch(String(pageNodeID)),
    staleTime: 0,
    enabled: true,
  });
  const role = selfAndChildren.role;
  return <Editor role={role} />;
}
