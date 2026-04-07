'use client';

import * as React from 'react';
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  GalleryVerticalEnd,
  LineChart,
  Link,
  MoreHorizontal,
  Settings2,
  Star,
  Trash,
  Trash2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { useEditComment } from '@liveblocks/react';
import { Globe, Link2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Label } from '../ui/label';
import { pagePublicInfoFetch } from '@/lib/api/getPublishedFetch';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelectedData } from '@/app/Providers/ClientDataProvider';
import { togglePublishFetch } from '@/lib/api/togglePublishFetch';
import { is } from 'zod/v4/locales';

const data = [
  [
    {
      label: 'Customize Page',
      icon: Settings2,
    },
    {
      label: 'Turn into wiki',
      icon: FileText,
    },
  ],
  [
    {
      label: 'Copy Link',
      icon: Link,
    },
    {
      label: 'Duplicate',
      icon: Copy,
    },
    {
      label: 'Move to',
      icon: CornerUpRight,
    },
    {
      label: 'Move to Trash',
      icon: Trash2,
    },
  ],
  [
    {
      label: 'Undo',
      icon: CornerUpLeft,
    },
    {
      label: 'View analytics',
      icon: LineChart,
    },
    {
      label: 'Version History',
      icon: GalleryVerticalEnd,
    },
    {
      label: 'Show delete pages',
      icon: Trash,
    },
    {
      label: 'Notifications',
      icon: Bell,
    },
  ],
  [
    {
      label: 'Import',
      icon: ArrowUp,
    },
    {
      label: 'Export',
      icon: ArrowDown,
    },
  ],
];

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex items-center gap-2 text-sm">
      <PublishButton />
      <div className="text-muted-foreground hidden font-medium md:inline-block">
        Edit Oct 08
      </div>
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Star />
      </Button>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-accent h-7 w-7"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton>
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function PublishButton({}: any) {
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();
  const pageNodeID = useSelectedData((state) => state.pageNodeID);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const { data: publicData } = useQuery({
    queryKey: ['pagePublicInfo', Number(pageNodeID)],
    queryFn: () => pagePublicInfoFetch(pageNodeID),
    enabled: !!pageNodeID, // pageId 없으면 실행 안 함
  });
  console.log('publicData', publicData);
  const toggleMutation = useMutation({
    mutationFn: (pageId: Number) => togglePublishFetch(pageId),

    onSuccess: (data, pageId) => {
      queryClient.invalidateQueries({
        queryKey: ['pagePublicInfo', Number(pageId)],
      });
    },
  });
  const handleTogglePublish = () => {
    if (!pageNodeID) return;
    toggleMutation.mutate(pageNodeID);
  };
  if (!publicData) return null;

  const shareUrl = publicData.publictoken
    ? `${baseUrl}/share/${publicData.publictoken}`
    : '';
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <Globe className="h-4 w-4" />
          {publicData.ispublished ? 'Published' : 'Publish'}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-80 p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="publish-mode"
              checked={publicData.ispublished ?? false}
              onCheckedChange={handleTogglePublish}
              disabled={toggleMutation.isPending}
            />
            <Label htmlFor="publish-mode">Publish Mode</Label>
          </div>

          <Separator />

          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center border rounded-md px-3 h-9 text-sm text-muted-foreground overflow-hidden">
              <Link2 className="mr-2 h-4 w-4 shrink-0" />
              <span className="truncate">{shareUrl}</span>
            </div>

            <Button size="sm" variant="secondary" onClick={handleCopy}>
              {copied ? <Check color="green" /> : 'Copy'}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
