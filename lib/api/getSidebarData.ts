export async function getSidebarData() {
  const res = await fetch(`/api/pages`, {
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '데이터 가져오기 실패.');
  }
  return data;
}
