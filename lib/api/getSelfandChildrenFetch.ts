export async function getSelfandChildrenFetch(pageId: string) {
  const res = await fetch(`/api/pages/${pageId}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || '데이터 가져오기 실패.');
  }
  // console.log(data);
  return data;
}
