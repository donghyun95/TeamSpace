export async function getAncestorPathFetch(pageId: string) {
  // console.log(pageId);
  const res = await fetch(`/api/ancestorpath?pageId=${pageId}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || '데이터 가져오기 실패.');
  }
  return data;
}
