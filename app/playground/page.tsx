"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  FileText,
  Folder,
  FolderGit2,
  Home,
  Settings,
  type LucideIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

/* =========================================================
   types
========================================================= */

type FlatNavItem = {
  id: string;
  parentId: string | null;
  title: string;
  href?: string;
  icon?: LucideIcon;
  order?: number;
};

type TreeNavItem = FlatNavItem & {
  children: TreeNavItem[];
};

/* =========================================================
   mock data (parentId 기반 flat data)
========================================================= */

const mockNavItems: FlatNavItem[] = [
  {
    id: "home",
    parentId: null,
    title: "Home",
    href: "/",
    icon: Home,
    order: 0,
  },

  {
    id: "docs",
    parentId: null,
    title: "Docs",
    icon: BookOpen,
    order: 1,
  },
  {
    id: "docs-getting-started",
    parentId: "docs",
    title: "Getting Started",
    href: "/docs/getting-started",
    order: 0,
  },
  {
    id: "docs-guide",
    parentId: "docs",
    title: "Guide",
    order: 1,
  },
  {
    id: "docs-guide-installation",
    parentId: "docs-guide",
    title: "Installation",
    href: "/docs/guide/installation",
    order: 0,
  },
  {
    id: "docs-guide-routing",
    parentId: "docs-guide",
    title: "Routing",
    href: "/docs/guide/routing",
    order: 1,
  },
  {
    id: "docs-api",
    parentId: "docs",
    title: "API",
    order: 2,
  },
  {
    id: "docs-api-auth",
    parentId: "docs-api",
    title: "Auth",
    href: "/docs/api/auth",
    order: 0,
  },
  {
    id: "docs-api-users",
    parentId: "docs-api",
    title: "Users",
    href: "/docs/api/users",
    order: 1,
  },
  {
    id: "docs-api-billing",
    parentId: "docs-api",
    title: "Billing",
    href: "/docs/api/billing",
    order: 2,
  },

  {
    id: "projects",
    parentId: null,
    title: "Projects",
    icon: FolderGit2,
    order: 2,
  },
  {
    id: "project-alpha",
    parentId: "projects",
    title: "Alpha",
    href: "/projects/alpha",
    order: 0,
  },
  {
    id: "project-beta",
    parentId: "projects",
    title: "Beta",
    order: 1,
  },
  {
    id: "project-beta-frontend",
    parentId: "project-beta",
    title: "Frontend",
    href: "/projects/beta/frontend",
    order: 0,
  },
  {
    id: "project-beta-backend",
    parentId: "project-beta",
    title: "Backend",
    href: "/projects/beta/backend",
    order: 1,
  },

  {
    id: "settings",
    parentId: null,
    title: "Settings",
    href: "/settings",
    icon: Settings,
    order: 3,
  },
];

/* =========================================================
   page
========================================================= */

export default function page() {
  // mock 선택 상태
  const currentId = "docs-api-auth";

  return (
    <SidebarProvider>
      <AppSidebar items={mockNavItems} currentId={currentId} />

      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="text-sm font-medium">Recursive Tree Sidebar Demo</div>
        </header>

        <main className="p-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">ParentId 기반 재귀 트리</h1>
            <p className="text-muted-foreground text-sm">
              왼쪽 사이드바는 flat data를 tree로 변환한 뒤 재귀적으로
              렌더링합니다.
            </p>
            <p className="text-muted-foreground text-sm">
              현재 선택된 id: <span className="font-medium">{currentId}</span>
            </p>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

/* =========================================================
   sidebar
========================================================= */

function AppSidebar({
  items,
  currentId,
}: {
  items: FlatNavItem[];
  currentId?: string;
}) {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <FolderTreeMenu items={items} currentId={currentId} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

/* =========================================================
   recursive tree menu
========================================================= */

function FolderTreeMenu({
  items,
  currentId,
}: {
  items: FlatNavItem[];
  currentId?: string;
}) {
  const tree = React.useMemo(() => buildTree(items), [items]);

  const [openIds, setOpenIds] = React.useState<Set<string>>(() =>
    getAncestorIds(items, currentId),
  );

  React.useEffect(() => {
    const ancestorIds = getAncestorIds(items, currentId);

    setOpenIds((prev) => {
      const next = new Set(prev);
      ancestorIds.forEach((id) => next.add(id));
      return next;
    });
  }, [items, currentId]);

  const setNodeOpen = React.useCallback((id: string, open: boolean) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  return (
    <SidebarMenu>
      {tree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          depth={0}
          currentId={currentId}
          openIds={openIds}
          setNodeOpen={setNodeOpen}
        />
      ))}
    </SidebarMenu>
  );
}

function TreeNode({
  node,
  depth,
  currentId,
  openIds,
  setNodeOpen,
}: {
  node: TreeNavItem;
  depth: number;
  currentId?: string;
  openIds: Set<string>;
  setNodeOpen: (id: string, open: boolean) => void;
}) {
  const hasChildren = node.children.length > 0;
  const isRoot = depth === 0;
  const isOpen = openIds.has(node.id);
  const isActive = currentId === node.id;
  const Icon = node.icon ?? (hasChildren ? Folder : FileText);

  // leaf node
  if (!hasChildren) {
    if (isRoot) {
      return (
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={isActive}>
            <Link href={node.href ?? "#"}>
              <Icon />
              <span>{node.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }

    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild isActive={isActive}>
          <Link href={node.href ?? "#"}>
            <Icon />
            <span>{node.title}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }

  // parent node
  if (isRoot) {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={(open) => setNodeOpen(node.id, open)}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={node.title}>
              <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
              <Icon />
              <span>{node.title}</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              {node.children.map((child) => (
                <TreeNode
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  currentId={currentId}
                  openIds={openIds}
                  setNodeOpen={setNodeOpen}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={(open) => setNodeOpen(node.id, open)}
      className="group/collapsible"
    >
      <SidebarMenuSubItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuSubButton isActive={isActive}>
            <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
            <Icon />
            <span>{node.title}</span>
          </SidebarMenuSubButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                depth={depth + 1}
                currentId={currentId}
                openIds={openIds}
                setNodeOpen={setNodeOpen}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuSubItem>
    </Collapsible>
  );
}

/* =========================================================
   utils
========================================================= */

function buildTree(items: FlatNavItem[]): TreeNavItem[] {
  const map = new Map<string, TreeNavItem>();

  for (const item of items) {
    map.set(item.id, {
      ...item,
      children: [],
    });
  }

  const roots: TreeNavItem[] = [];

  for (const item of items) {
    const node = map.get(item.id)!;
    if (item.parentId && map.has(item.parentId)) {
      map.get(item.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return sortTree(roots);
}

function sortTree(nodes: TreeNavItem[]) {
  nodes.sort((a, b) => {
    const orderDiff = (a.order ?? 0) - (b.order ?? 0);
    if (orderDiff !== 0) return orderDiff;
    return a.title.localeCompare(b.title);
  });

  for (const node of nodes) {
    if (node.children.length > 0) {
      sortTree(node.children);
    }
  }

  return nodes;
}

function getAncestorIds(items: FlatNavItem[], currentId?: string) {
  if (!currentId) return new Set<string>();

  const byId = new Map(items.map((item) => [item.id, item]));
  const openIds = new Set<string>();

  let current = byId.get(currentId);

  while (current?.parentId) {
    openIds.add(current.parentId);
    current = byId.get(current.parentId);
  }

  return openIds;
}
