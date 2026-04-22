export async function permanentDeletePageFetch(pageId: number) {
  const res = await fetch(`/api/pages/${pageId}/permanent`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || '페이지 영구 삭제에 실패했습니다.');
  }

  return data;
}
