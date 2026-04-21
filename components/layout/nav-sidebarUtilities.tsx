'use client';

import { Button } from '@/components/ui/button';
import {
  CircleQuestionMark,
  Inbox,
  Star,
  Trash2,
  RotateCcw,
  Trash,
} from 'lucide-react';
import {
  usePurgePageMutation,
  useRestorePageMutation,
  useTrashPagesQuery,
} from './tanstack-query-collection';
import { useSession } from 'next-auth/react';

const utilityItemClass = `
  w-full justify-start gap-3
  px-3 py-2 h-auto
  rounded-lg
  text-[#5c605a]
  font-headline text-sm font-medium tracking-tight
  hover:bg-[#e7e9e2] hover:text-[#5c605a]
  active:scale-[0.98]
  transition-colors duration-200
`;

export function SidebarTopUtilities() {
  return (
    <div className="space-y-1 py-2 px-2">
      <Button variant="ghost" className={utilityItemClass}>
        <Star className="w-5 h-5" />
        <span>Favorites</span>
      </Button>

      <Button variant="ghost" className={utilityItemClass}>
        <Inbox className="w-5 h-5" />
        <span className="text-sm">Inbox</span>
      </Button>
    </div>
  );
}

function TrashListPanel() {
  const { data: session } = useSession();
  const { data: trashPages, isLoading, isError } = useTrashPagesQuery();
  const restoreMutation = useRestorePageMutation();
  const purgeMutation = usePurgePageMutation();

  if (isLoading) {
    return <div className="px-3 py-2 text-xs text-[#5c605a]/80">Loading…</div>;
  }

  if (isError) {
    return (
      <div className="px-3 py-2 text-xs text-red-500">
        휴지통 목록을 불러오지 못했습니다.
      </div>
    );
  }

  if (!trashPages || trashPages.length === 0) {
    return <div className="px-3 py-2 text-xs text-[#5c605a]/80">휴지통이 비어있습니다.</div>;
  }

  return (
    <ul className="mt-2 max-h-52 overflow-y-auto space-y-2 px-2">
      {trashPages.map((page) => {
        const isBusy = restoreMutation.isPending || purgeMutation.isPending;
        const canPurge = page.role === 'OWNER' || page.role === 'ADMIN';

        return (
          <li key={page.id} className="rounded-md bg-[#f2f3ed] p-2">
            <div className="text-xs text-[#30332e] truncate">
              {(page.icon ?? '📄') + ' ' + page.title}
            </div>
            <div className="text-[11px] text-[#5c605a]/80 truncate">
              {page.workspace.name}
            </div>
            {page.parentDeleted && (
              <div className="mt-1 text-[11px] text-amber-700">
                복구 시 루트 페이지로 이동됩니다.
              </div>
            )}
            <div className="mt-2 flex gap-1">
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isBusy}
                onClick={() =>
                  restoreMutation.mutate({
                    pageId: page.id,
                    userId: session?.user?.id,
                  })
                }
                className="h-7 px-2 text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" /> 복구
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                disabled={!canPurge || isBusy}
                onClick={() =>
                  purgeMutation.mutate({
                    pageId: page.id,
                    userId: session?.user?.id,
                  })
                }
                className="h-7 px-2 text-xs"
              >
                <Trash className="h-3.5 w-3.5" /> 영구삭제
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function SidebarBottomUtiltiy() {
  return (
    <div className="space-y-1 py-2 px-2">
      <Button variant="ghost" className={utilityItemClass}>
        <CircleQuestionMark className="w-5 h-5" />
        <span>Help</span>
      </Button>

      <div className="rounded-lg border border-[#e3e5de] bg-white/40 p-1">
        <Button variant="ghost" className={utilityItemClass}>
          <Trash2 className="w-5 h-5" />
          <span>Trash</span>
        </Button>
        <TrashListPanel />
      </div>
    </div>
  );
}
