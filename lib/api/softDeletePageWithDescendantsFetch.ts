export type SoftDeletePageWithDescendantsResponse = {
  pageId: number;
  deletedCount: number;
};

export async function softDeletePageWithDescendantsFetch(
  pageId: number,
): Promise<SoftDeletePageWithDescendantsResponse> {
  const res = await fetch(`/api/pages/${pageId}/soft-delete`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || '페이지 삭제에 실패했습니다.');
  }

  return data;
}
