export const togglePublishFetch = async (pageId: number) => {
  const res = await fetch('/api/pagepublic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pageId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || '토글 실패');
  }

  return data;
};
