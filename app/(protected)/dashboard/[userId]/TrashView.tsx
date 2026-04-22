'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { getSidebarData } from '@/lib/api/getSidebarData';
import { getTrashPagesFetch } from '@/lib/api/getTrashPagesFetch';
import { restorePageFetch } from '@/lib/api/restorePageFetch';
import { permanentDeletePageFetch } from '@/lib/api/permanentDeletePageFetch';

type TrashViewProps = {
  initialWorkspaceId?: number;
};

export function TrashView({ initialWorkspaceId }: TrashViewProps) {
  const queryClient = useQueryClient();
  const { data: sidebarData } = useQuery({
    queryKey: ['initialPage'],
    queryFn: getSidebarData,
  });

  const workspaceOptions = useMemo(() => {
    const personalWorkspace = sidebarData?.personal;
    const teamWorkspaces = sidebarData?.workspaces ?? [];

    const options = [] as { id: number; name: string }[];

    if (personalWorkspace) {
      options.push({ id: personalWorkspace.id, name: personalWorkspace.name });
    }

    for (const workspace of teamWorkspaces) {
      options.push({ id: workspace.id, name: workspace.name });
    }

    return options;
  }, [sidebarData]);

  const [workspaceId, setWorkspaceId] = useState<number | undefined>(
    initialWorkspaceId,
  );

  const resolvedWorkspaceId =
    workspaceId ?? initialWorkspaceId ?? workspaceOptions[0]?.id;

  const { data: trashPages = [], isLoading } = useQuery({
    queryKey: ['trashPages', resolvedWorkspaceId],
    queryFn: () => getTrashPagesFetch(resolvedWorkspaceId as number),
    enabled: Number.isFinite(resolvedWorkspaceId),
  });

  const restoreMutation = useMutation({
    mutationFn: restorePageFetch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['trashPages', resolvedWorkspaceId],
      });
      await queryClient.invalidateQueries({ queryKey: ['initialPage'] });
    },
  });

  const permanentDeleteMutation = useMutation({
    mutationFn: permanentDeletePageFetch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['trashPages', resolvedWorkspaceId],
      });
      await queryClient.invalidateQueries({ queryKey: ['initialPage'] });
    },
  });

  return (
    <div className="mx-auto w-full max-w-[900px] px-8 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">휴지통</h1>

        <select
          value={resolvedWorkspaceId}
          onChange={(e) => setWorkspaceId(Number(e.target.value))}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          {workspaceOptions.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <p className="text-sm text-gray-500">불러오는 중...</p>}

      {!isLoading && trashPages.length === 0 && (
        <div className="rounded-lg border border-dashed p-10 text-center text-gray-500">
          휴지통이 비어 있습니다.
        </div>
      )}

      <div className="space-y-3">
        {trashPages.map((page) => (
          <div
            key={page.id}
            className="flex items-center justify-between rounded-lg border bg-white p-4"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {(page.icon ?? '📄') + ' ' + (page.title || 'Untitled')}
              </p>
              <p className="text-xs text-gray-500">
                삭제일: {new Date(page.deletedAt).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => restoreMutation.mutate(page.id)}
                disabled={restoreMutation.isPending || permanentDeleteMutation.isPending}
              >
                복구
              </Button>

              <Button
                variant="destructive"
                onClick={() => permanentDeleteMutation.mutate(page.id)}
                disabled={restoreMutation.isPending || permanentDeleteMutation.isPending}
              >
                영구 삭제
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
