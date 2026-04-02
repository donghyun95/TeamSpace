export async function updateTitleANDIcon(
  pageID: number,
  title: string | undefined,
  icon: string | undefined,
) {
  const res = await fetch(`/api/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pageID, title, icon }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || '데이터 수정 실패.');
  }

  return data;
}
