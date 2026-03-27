'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, MoreHorizontal, Plus } from 'lucide-react';

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
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { createPage } from '@/lib/api/createPage';
import { getSelfandChildrenFetch } from '@/lib/api/getSelfandChildrenFetch';
import Link from 'next/link';

type Page = {
  id: string;
  title: string;
  href?: string;
  hasChildren?: boolean;
};
type WorkspaceData = {
  workspaces: any[];
  personal: {
    workspace: {
      id: number;
      name: string;
      type: string;
      createdAt: string;
      updatedAt: string;
    };
    rootPages: any[];
  };
};
type PageTreeNodeProps = {
  page: Page;
  depth: number;
  ancestorPath: any;
};
const INDENT_SIZE = 12;
const TOGGLE_WIDTH = 20;

function PageTreeNode({
  page,
  depth,
  ancestorPath = new Set(),
}: PageTreeNodeProps) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const { data: childrenPages = [] } = useQuery({
    queryKey: ['page', page.id],
    queryFn: () => getSelfandChildrenFetch(page.id),
    staleTime: 0,
    enabled: true,
  });

  const indent = depth * INDENT_SIZE;
  const childIndent = (depth + 1) * INDENT_SIZE + TOGGLE_WIDTH;

  function handleOpnOpenChange() {
    setOpen((prev) => !prev);
  }
  useEffect(() => {
    setOpen(ancestorPath.has(page.id));
  }, [ancestorPath, page.id]);
  //onOpenChange={}
  return (
    <SidebarMenuItem className="w-full list-none">
      <Collapsible
        className="w-full"
        onOpenChange={handleOpnOpenChange}
        open={open}
      >
        <div className="group/row grid w-full grid-cols-[1fr_32px] items-center">
          <div
            className="flex min-w-0 items-center"
            style={{ paddingLeft: indent }}
          >
            <div className="flex h-8 w-5 shrink-0 items-center justify-center">
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="group/trigger flex h-8 w-5 items-center justify-center rounded-sm hover:bg-sidebar-accent"
                >
                  <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/trigger:rotate-90" />
                </button>
              </CollapsibleTrigger>
            </div>

            <SidebarMenuButton asChild className="min-w-0 h-8 flex-1 pr-2">
              <Link
                href={`./${session?.user.id}?PageId=${page.id}`}
                className="min-w-0 flex-1 truncate"
                title={page.title}
              >
                {page.title}
              </Link>
            </SidebarMenuButton>
          </div>

          <div className="flex h-8 w-8 items-center justify-center">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md opacity-0 transition-opacity group-hover/row:opacity-100 hover:bg-sidebar-accent cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <CollapsibleContent className="w-full">
          {childrenPages && childrenPages.length > 0 && (
            <ul className="w-full min-w-0">
              {childrenPages.map((child) => (
                <PageTreeNode
                  key={child.id}
                  page={child}
                  depth={depth + 1}
                  ancestorPath={ancestorPath}
                />
              ))}
            </ul>
          )}
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

type NavPersonalSpaceProps = {
  pages: Page[];
  path: [];
};

export function NavPersonalSpace({ pages, path = [] }: NavPersonalSpaceProps) {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const ancestorPath = new Set(path);
  console.log('ancestorPath', ancestorPath);
  const mutation = useMutation({
    mutationFn: createPage,
    onMutate: async () => {
      const queryKey = ['initialPage', session?.user.id];
      await queryClient.cancelQueries({ queryKey });
      const previousPages = queryClient.getQueryData<WorkspaceData>(queryKey);
      if (!previousPages) return;
      const DummyPersonalSpaceRootItem = {
        authorId: session?.user.id,
        createdAt: new Date().toString(),
        icon: null,
        id: Date.now(),
        order: previousPages.personal.rootPages.length,
        parentId: null,
        title: 'Untitled',
        updatedAt: new Date().toString(),
        workspaceId: 1,
      };
      queryClient.setQueryData<WorkspaceData>(queryKey, (old) => {
        if (!old) return old;
        const value = {
          ...old,
          personal: {
            ...old.personal,
            rootPages: [
              ...(old.personal?.rootPages ?? []),
              DummyPersonalSpaceRootItem,
            ],
          },
        };
        return value;
      });
      return { previousPages };
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['initialPage', session?.user.id],
    //   });
    // },
    onError: (_error, _vars, context) => {
      console.log('❌ 에러 발생 → 롤백');
      if (!context?.previousPages) return;
      queryClient.setQueryData(
        ['initialPage', session?.user.id],
        context?.previousPages,
      );
    },
    onSettled: async () => {
      console.log('🔄 invalidate → 서버 동기화');

      await queryClient.invalidateQueries({
        queryKey: ['initialPage', session?.user.id],
      });
    },
  });
  const handleClickPersonalRootPage = () => {
    mutation.mutate(null);
  };
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <div className="group/row grid w-full grid-cols-[1fr_32px] items-center">
        <span className="pl-2">Personal Space</span>
        <button
          onClick={handleClickPersonalRootPage}
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent cursor-pointer ml-auto"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <SidebarGroupContent>
        <SidebarMenu>
          {pages.map((page) => (
            <PageTreeNode
              key={page.id}
              page={page}
              depth={0}
              ancestorPath={ancestorPath}
            />
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <MoreHorizontal />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
