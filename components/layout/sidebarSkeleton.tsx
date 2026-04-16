import { Skeleton } from '@/components/ui/skeleton';

export function SidebarSkeleton() {
  return (
    <aside className="h-screen w-64 border-r p-4 flex flex-col">
      {/* 로고 영역 */}
      <Skeleton className="h-8 w-32 mb-6" />

      {/* 메뉴 리스트 */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-full" />
        ))}
      </div>

      {/* 하단 영역 (유저 정보 같은거) */}
      <div className="mt-auto pt-6">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </aside>
  );
}
