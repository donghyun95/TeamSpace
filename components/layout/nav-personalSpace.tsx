// "use client";

// import {
//   ArrowUpRight,
//   Link,
//   MoreHorizontal,
//   StarOff,
//   Trash2,
//   ChevronRight,
//   Plus,
// } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
//   SidebarGroupContent,
// } from "@/components/ui/sidebar";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";

// import { useEffect, useState } from "react";

// async function fetchChildPages(parentId: string) {
//   const res = await fetch(`/api/pages?parentId=${parentId}`);
//   if (!res.ok) throw new Error("Failed to fetch pages");
//   return res.json();
// }

// function MakeParentPageComponent({ pages, depth = 0 }: any) {
//   const [childrenById, setChildrenById] = useState<Record<string, any[]>>({});
//   useEffect(() => {
//     console.log("childrenId state:", childrenById);
//   }, [childrenById]);
//   return pages.map((page: any) => {
//     const SidebarItem = depth === 0 ? SidebarMenuItem : SidebarMenuSubItem;
//     const SidebarButtonItem =
//       depth === 0 ? SidebarMenuButton : SidebarMenuSubButton;
//     return (
//       <Collapsible
//         key={page.id}
//         className="w-full min-w-0"
//         onOpenChange={async (isOpen) => {
//           if (isOpen) {
//             const childPages = await fetchChildPages(page.id);
//             setChildrenById((prev) => ({ ...prev, [page.id]: childPages }));
//           }
//         }}
//       >
//         <SidebarItem className="w-full min-w-0">
//           <SidebarButtonItem asChild className="w-full min-w-0 pr-10">
//             <a href="#" className="flex w-full min-w-0 items-center gap-2">
//               {/* url 연결 필요*/}
//               <span className="w-4 shrink-0" />
//               <span className="min-w-0 flex-1 truncate">{page.title}</span>
//             </a>
//           </SidebarButtonItem>
//           <CollapsibleTrigger asChild>
//             <SidebarMenuAction
//               className="bg-sidebar-accent text-sidebar-accent-foreground left-2 data-[state=open]:rotate-90"
//               showOnHover
//             >
//               <ChevronRight />
//             </SidebarMenuAction>
//           </CollapsibleTrigger>
//           <SidebarMenuAction showOnHover className="right-2 left-auto">
//             <Plus />
//           </SidebarMenuAction>
//           <CollapsibleContent className="w-full min-w-0">
//             <SidebarMenuSub className="w-full min-w-0">
//               {childrenById[page.id] && (
//                 <MakeParentPageComponent
//                   pages={childrenById[page.id]}
//                   depth={depth + 1}
//                 />
//               )}
//             </SidebarMenuSub>
//           </CollapsibleContent>
//         </SidebarItem>
//       </Collapsible>
//     );
//   });
// }

// export function NavPersonalSpace({ pages }: any) {
//   const { isMobile } = useSidebar();
//   console.log("NavPersonalSpace props:", { pages });
//   return (
//     <SidebarGroup className="group-data-[collapsible=icon]:hidden">
//       <SidebarGroupLabel>Personal Space</SidebarGroupLabel>
//       <SidebarGroupContent>
//         <SidebarMenu>
//           <MakeParentPageComponent pages={pages}></MakeParentPageComponent>
//           <SidebarMenuItem>
//             <SidebarMenuButton className="text-sidebar-foreground/70">
//               <MoreHorizontal />
//               <span>More</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarGroupContent>
//     </SidebarGroup>
//   );
// }

"use client";

import { useState } from "react";
import { ChevronRight, MoreHorizontal, Plus } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type Page = {
  id: string;
  title: string;
  href?: string;
  hasChildren?: boolean;
};

async function fetchChildPages(parentId: string): Promise<Page[]> {
  const res = await fetch(`/api/pages?parentId=${parentId}`);
  if (!res.ok) throw new Error("Failed to fetch pages");
  return res.json();
}

type PageTreeProps = {
  pages: Page[];
  depth?: number;
};

function PageTree({ pages, depth = 0 }: PageTreeProps) {
  return (
    <ul className="w-full min-w-0">
      {pages.map((page) => (
        <PageTreeNode key={page.id} page={page} depth={depth} />
      ))}
    </ul>
  );
}

type PageTreeNodeProps = {
  page: Page;
  depth: number;
};

function PageTreeNode({ page, depth }: PageTreeNodeProps) {
  const [children, setChildren] = useState<Page[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const hasChildren = page.hasChildren ?? true;

  const handleOpenChange = async (open: boolean) => {
    if (!open || !hasChildren || loaded || loading) return;

    try {
      setLoading(true);
      const result = await fetchChildPages(page.id);
      setChildren(result);
      setLoaded(true);
    } catch (error) {
      console.error("Failed to load children:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarMenuItem className="w-full list-none">
      <Collapsible className="w-full" onOpenChange={handleOpenChange}>
        <div className="group/row grid w-full grid-cols-[1fr_32px] items-center">
          <div className="min-w-0">
            <div
              className="flex min-w-0 items-center"
              style={{ paddingLeft: depth * 12 }}
            >
              <div className="flex h-8 w-5 shrink-0 items-center justify-center">
                {hasChildren ? (
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      aria-label={`${page.title} 펼치기`}
                      className="group/trigger flex h-8 w-5 items-center justify-center rounded-sm hover:bg-sidebar-accent "
                    >
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/trigger:rotate-90" />
                    </button>
                  </CollapsibleTrigger>
                ) : (
                  <span className="block h-8 w-5" />
                )}
              </div>

              <SidebarMenuButton asChild className="min-w-0 h-8 flex-1 pr-2">
                <a
                  href={page.href ?? "#"}
                  className="min-w-0 flex-1 truncate"
                  title={page.title}
                >
                  {page.title}
                </a>
              </SidebarMenuButton>
            </div>
          </div>

          <div className="flex h-8 w-8 items-center justify-center">
            <button
              type="button"
              aria-label={`${page.title} 아래에 페이지 추가`}
              className="flex h-8 w-8 items-center justify-center rounded-md opacity-0 transition-opacity group-hover/row:opacity-100 hover:bg-sidebar-accent cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <CollapsibleContent className="w-full">
          {loading && (
            <div
              className="px-2 py-1 text-xs text-muted-foreground"
              style={{ paddingLeft: (depth + 1) * 12 + 20 }}
            >
              Loading...
            </div>
          )}

          {children && children.length > 0 && (
            <PageTree pages={children} depth={depth + 1} />
          )}
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

type NavPersonalSpaceProps = {
  pages: Page[];
};

export function NavPersonalSpace({ pages }: NavPersonalSpaceProps) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Personal Space</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {pages.map((page) => (
            <PageTreeNode key={page.id} page={page} depth={0} />
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
