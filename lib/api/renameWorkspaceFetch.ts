export async function renameWorkspaceFetch(workspaceId: number, name: string) {
  const res = await fetch(
    `/api/workspaces/${workspaceId}/members/renameWorkSpace`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    },
  );

  if (!res.ok) {
    throw new Error('Failed to rename workspace');
  }

  return res.json();
}
