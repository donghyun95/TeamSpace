import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
export function WorkspaceSettingsDialog({
  open,
  onOpenChange,
  workspaceId,
  workspaceName,
}: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black border-gray-200 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle>워크스페이스 설정</DialogTitle>
          <DialogDescription>
            워크스페이스 이름, 멤버, 권한 등을 관리합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <WorkspaceNameSection
            workspaceId={workspaceId}
            workspaceName={workspaceName}
          />

          <WorkspaceMembersSection workspaceId={workspaceId} />

          <WorkspaceDangerZoneSection workspaceId={workspaceId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
function WorkspaceNameSection({ workspaceId, workspaceName }: any) {
  return (
    <section className="space-y-2">
      <div>
        <h3 className="text-sm font-semibold">이름 변경</h3>
        <p className="text-sm text-muted-foreground">
          workspaceId: {workspaceId}
        </p>
      </div>

      <div className="rounded-md border p-3 text-sm">
        현재 이름: {workspaceName || 'My Workspace'}
      </div>
    </section>
  );
}
type WorkspaceMembersSectionProps = {
  workspaceId: number;
};

function WorkspaceMembersSection({
  workspaceId,
}: WorkspaceMembersSectionProps) {
  return (
    <section className="space-y-2">
      <div>
        <h3 className="text-sm font-semibold">멤버 관리</h3>
        <p className="text-sm text-muted-foreground">
          멤버 목록, 권한 변경, 멤버 제거 영역
        </p>
      </div>

      <div className="rounded-md border p-3 text-sm">
        members section placeholder / workspaceId: {workspaceId}
      </div>
    </section>
  );
}
type WorkspaceDangerZoneSectionProps = {
  workspaceId: number;
};

function WorkspaceDangerZoneSection({
  workspaceId,
}: WorkspaceDangerZoneSectionProps) {
  return (
    <section className="space-y-2 border-t pt-4">
      <div>
        <h3 className="text-sm font-semibold text-red-500">Danger Zone</h3>
        <p className="text-sm text-muted-foreground">
          삭제 같은 위험한 작업 영역
        </p>
      </div>

      <div className="rounded-md border border-red-200 p-3 text-sm text-red-500">
        delete section placeholder / workspaceId: {workspaceId}
      </div>
    </section>
  );
}
