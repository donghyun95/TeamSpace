'use client';

import { useState } from 'react';
import { ChevronRight, MoreHorizontal, Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPage } from '@/lib/api/createPage';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

type Page = {
  id: string | number;
  title: string;
  href?: string;
  hasChildren?: boolean;
  icon?: string;
};

type Workspace = {
  id: string | number;
  name: string;
  rootPages: Page[];
};

type PageTreeNodeProps = {
  page: Page;
  depth: number;
};

type NavWorkspacesProps = {
  workspaces: Workspace[];
};

const INDENT_SIZE = 12;
const TOGGLE_WIDTH = 20;

// 기존 PageTreeNode import 해서 써도 되고,
// 같은 파일이면 기존 PageTreeNode 그대로 재사용하면 된다.
declare function PageTreeNode(props: PageTreeNodeProps): JSX.Element;

function WorkspaceItem({ workspace }: { workspace: Workspace }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPage,
    onMutate: async () => {
      const queryKey = ['initialPage'];
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<any>(queryKey);

      const dummyRootPage = {
        id: `temp-${Date.now()}`,
        title: 'Untitled',
        icon: '📄',
        parentId: null,
        workspaceId: workspace.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          workspaces: (old.workspaces ?? []).map((ws: any) =>
            ws.id === workspace.id
              ? {
                  ...ws,
                  rootPages: [...(ws.rootPages ?? []), dummyRootPage],
                }
              : ws,
          ),
        };
      });

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (!ctx?.previous) return;
      queryClient.setQueryData(['initialPage'], ctx.previous);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['initialPage'],
      });
    },
  });

  const handleCreateRootPage = () => {
    mutation.mutate({
      parentId: null,
      workspaceId: workspace.id,
    } as any);
  };

  return (
    <SidebarMenuItem className="w-full list-none">
      <Collapsible className="w-full" open={open} onOpenChange={setOpen}>
        <div className="group/row grid w-full grid-cols-[1fr_32px] items-center rounded-md hover:bg-gray-100">
          <div className="flex min-w-0 items-center">
            <div className="flex h-8 w-5 shrink-0 items-center justify-center">
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="group/trigger flex h-8 w-5 items-center justify-center rounded-sm"
                >
                  <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/trigger:rotate-90" />
                </button>
              </CollapsibleTrigger>
            </div>

            <div className="flex h-8 min-w-0 flex-1 items-center pr-2">
              <span className="truncate">{workspace.name}</span>
            </div>
          </div>

          <div className="flex h-8 w-8 items-center justify-center">
            <button
              type="button"
              onClick={handleCreateRootPage}
              className="flex h-8 w-8 items-center justify-center rounded-md opacity-0 transition-opacity group-hover/row:opacity-100 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <CollapsibleContent className="w-full">
          <SidebarMenu className="w-full">
            {workspace.rootPages?.map((page) => (
              <PageTreeNode key={page.id} page={page} depth={1} />
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

export function NavWorkspaces({ workspaces }: NavWorkspacesProps) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="w-full list-none">
            <Collapsible className="w-full" open={open} onOpenChange={setOpen}>
              <div className="group/row grid w-full grid-cols-[1fr_32px] items-center rounded-md hover:bg-gray-100">
                <div className="flex min-w-0 items-center">
                  <div className="flex h-8 w-5 shrink-0 items-center justify-center">
                    <CollapsibleTrigger asChild>
                      <button
                        type="button"
                        className="group/trigger flex h-8 w-5 items-center justify-center rounded-sm"
                      >
                        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/trigger:rotate-90" />
                      </button>
                    </CollapsibleTrigger>
                  </div>

                  <div className="flex h-8 min-w-0 flex-1 items-center pr-2">
                    <span className="truncate font-medium">Workspace</span>
                  </div>
                </div>

                <div className="flex h-8 w-8 items-center justify-center">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-md opacity-0 transition-opacity group-hover/row:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <CollapsibleContent className="w-full">
                <SidebarMenu className="w-full">
                  {workspaces.map((workspace) => (
                    <WorkspaceItem key={workspace.id} workspace={workspace} />
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
