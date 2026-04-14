'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import { ChevronsUpDown } from 'lucide-react';

export function SidebarUserInfo({ name, image }) {
  function logout() {
    signOut({ callbackUrl: '/login' });
  }

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="w-full h-10 px-2 focus:outline-none hover:bg-transparent data-[state=open]:bg-transparent">
            <div className="flex w-full items-center justify-between">
              {/* 왼쪽: 아바타 + 이름 + 상태 */}
              <div className="flex items-center gap-2 min-w-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={image} />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>

                <div className="flex flex-col min-w-0">
                  {/* 이름 + 온라인 점 */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-foreground truncate">
                      {name}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                  </div>

                  {/* 상태 메시지 */}
                  <span className="text-xs text-muted-foreground truncate">
                    Online
                  </span>
                </div>
              </div>

              {/* 오른쪽: 드롭다운 힌트 아이콘 */}
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground opacity-60" />
            </div>
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 rounded-lg"
          align="start"
          sideOffset={4}
        >
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
