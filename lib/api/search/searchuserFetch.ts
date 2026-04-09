export async function searchUserFetch(keyword: string, workspaceId: number) {
  if (!keyword) return [];

  const res = await fetch(
    `/api/search/user?keyword=${encodeURIComponent(keyword)}&workspaceId=${workspaceId}`,
    { cache: 'no-store' },
  );
  console.log(workspaceId, '페치 워크스페이스아이디');

  if (!res.ok) throw new Error('Failed to fetch');

  return res.json();
}
