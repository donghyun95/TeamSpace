type PageTreeMutationAction = 'soft-delete' | 'restore' | 'purge';

type PageTreeMutationResponse = {
  action: PageTreeMutationAction;
  pageId: number;
  affectedCount: number;
  restoredToRoot?: boolean;
};

export type TrashPageItem = {
  id: number;
  title: string;
  icon: string | null;
  workspaceId: number;
  parentId: number | null;
  deletedAt: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
  parentDeleted: boolean;
  workspace: {
    name: string;
    type: 'PERSONAL' | 'TEAM';
  };
};

type TrashPagesResponse = {
  pages: TrashPageItem[];
};

async function pageTreeMutationFetch(
  pageId: number,
  action: PageTreeMutationAction,
) {
  const response = await fetch(`/api/pages/${pageId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action }),
  });

  const result = (await response.json().catch(() => null)) as
    | PageTreeMutationResponse
    | { error?: string }
    | null;

  if (!response.ok) {
    throw new Error(
      (result && 'error' in result && result.error) ||
        '페이지 상태 변경에 실패했습니다.',
    );
  }

  return result as PageTreeMutationResponse;
}

export function trashPageFetch(pageId: number) {
  return pageTreeMutationFetch(pageId, 'soft-delete');
}

export function restorePageFetch(pageId: number) {
  return pageTreeMutationFetch(pageId, 'restore');
}

export function purgePageFetch(pageId: number) {
  return pageTreeMutationFetch(pageId, 'purge');
}

export async function getTrashPagesFetch() {
  const response = await fetch('/api/pages/trash');

  const result = (await response.json().catch(() => null)) as
    | TrashPagesResponse
    | { error?: string }
    | null;

  if (!response.ok) {
    throw new Error(
      (result && 'error' in result && result.error) ||
        '휴지통 목록을 가져오지 못했습니다.',
    );
  }

  return (result as TrashPagesResponse).pages;
}
