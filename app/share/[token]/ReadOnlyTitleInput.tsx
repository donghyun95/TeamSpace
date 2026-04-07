import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSelfandChildrenFetch } from '@/lib/api/getSelfandChildrenFetch';
import { pagePublicInfoFetch } from '@/lib/api/getPublishedFetch';

export function ReadOnlyTitle({ pagenodeID }: { pagenodeID: number }) {
  const { data: publicData } = useQuery({
    queryKey: ['pagePublicInfo', pagenodeID],
    queryFn: () => pagePublicInfoFetch(pagenodeID),
    enabled: !!pagenodeID, // pageId 없으면 실행 안 함
    refetchInterval: 2000,
  });
  const title = publicData.title ?? '';
  return <h1 className="readonlyTitle">{title}</h1>;
}
