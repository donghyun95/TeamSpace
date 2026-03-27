'use server';

import { Liveblocks } from '@liveblocks/node';

const liveblocks = new Liveblocks({
  secret:
    'sk_dev_llXjehzwkkkQj2JX-BzlYd-SV4AAnpEZNuXEXyGrwh9XVExH93PMNome6JFZMKhh',
});

export async function prewarmRoom(roomId: string) {
  await liveblocks.prewarmRoom(roomId);
}
