export async function getTrashPagesFetch(workspaceId: number) {
  const res = await fetch(`/api/pages/trash?workspaceId=${workspaceId}`, {
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || '휴지통 목록을 불러오지 못했습니다.');
  }

  return data.pages;
}
