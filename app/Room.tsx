'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
  useOthers,
  useUpdateMyPresence,
} from '@liveblocks/react/suspense';

type RoomData = {
  id: number;
  createdAt: Date;
  partNo: number;
  roomId: string;
};

type RoomProps = {
  children: ReactNode;
  data: RoomData[];
};
function RoomInner({ children }: { children: ReactNode }) {
  const others = useOthers();

  console.log(others);

  return <>{children}</>;
}

export function Room({ data, children }: any) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
      <RoomProvider id={'example'} initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

// export function Room({ data }: any) {
//   return (
//     <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
//       <div className="relative flex">
//         {data.map((obj: any) => (
//           <RoomProvider id={obj.roomId}>
//             <ClientSideSuspense fallback={<div>Loading…</div>}>
//               <Editor field={obj.roomId} />
//             </ClientSideSuspense>
//           </RoomProvider>
//         ))}
//       </div>
//     </LiveblocksProvider>
//   );
// }
