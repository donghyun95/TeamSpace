type CreatePageRequest = {
  workspaceID: number;
  parentId: number | null;
};

export async function createWorkSpacePageFetch({
  workspaceID,
  parentId,
}: CreatePageRequest) {
  const res = await fetch('/api/createWorkSpacePage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      workspaceID,
      parentId,
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error ?? 'CREATE_PAGE_FAILED');
  }

  return data;
}
