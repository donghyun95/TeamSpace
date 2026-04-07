import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSelfandChildrenFetch } from '@/lib/api/getSelfandChildrenFetch';
import { useState, useEffect } from 'react';
import { pagePublicInfoFetch } from '@/lib/api/getPublishedFetch';

export function ReadOnlyPopOverEmoticon({
  pagenodeID,
}: {
  pagenodeID: number;
}) {
  const { data: publicData } = useQuery({
    queryKey: ['pagePublicInfo', pagenodeID],
    queryFn: () => pagePublicInfoFetch(pagenodeID),
    enabled: !!pagenodeID, // pageId 없으면 실행 안 함
    refetchInterval: 2000,
  });
  console.log('publicData in emoticon', publicData);
  const [Emoticon, setEmoticon] = useState(undefined);
  if (!publicData) {
    return null;
  }
  return (
    <div className="emotiocnBox">
      <div className="emoticonWrapper title">
        <span className="text-5xl">{publicData.icon}</span>
      </div>
    </div>
  );
}
