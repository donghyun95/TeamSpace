export async function restorePageFetch(pageId: number) {
  const res = await fetch(`/api/pages/${pageId}/restore`, {
    method: 'PATCH',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || '페이지 복구에 실패했습니다.');
  }

  return data;
}
