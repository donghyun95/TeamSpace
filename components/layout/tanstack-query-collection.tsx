import { WorkspaceMemberRole } from '@/lib/api/getWorkSpaceMemberRoleFetch';
import { addMemberFetch } from '@/lib/api/invite/iviteaddmemberFetch';
import { searchUserFetch } from '@/lib/api/search/searchuserFetch';

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

type InviteRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';

type AddMemberParams = {
  workspaceId: number;
  inviteeUserId: string;
  role: InviteRole;
};

export const addMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMemberFetch,

    onSuccess: (_, variables) => {
      //쿼리키 수정필요 // serchuser는수정필요없을거같고 ,
      // queryClient.invalidateQueries({
      //   queryKey: ['workspace-members', variables.workspaceId],
      // });

      // queryClient.invalidateQueries({
      //   queryKey: ['workspace-invites', variables.workspaceId],
      // });
      queryClient.invalidateQueries({
        queryKey: ['searchUsers'],
      });
    },
  });
};

export function useSearchUsers(keyword: string, workspaceId: number) {
  return useQuery({
    queryKey: ['searchUsers', keyword],
    queryFn: () => searchUserFetch(keyword, workspaceId),
    enabled: !!keyword && keyword.trim().length >= 3, // keyword 없으면 아예 실행 안함
    staleTime: 0,
  });
}

export function useWorkspaceMemberRole(workspaceId: number, userId: string) {
  return useQuery({
    queryKey: ['workspaceRole', workspaceId, userId],
    queryFn: () => WorkspaceMemberRole(workspaceId, userId),
    enabled: !!workspaceId && !!userId,
  });
}
