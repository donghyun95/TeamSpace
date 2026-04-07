export async function createWorkSpaceFetch() {
  const res = await fetch('/api/createWorkSpace', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error ?? 'CREATE_WORKSPACE_FAILED');
  }

  return data;
}
