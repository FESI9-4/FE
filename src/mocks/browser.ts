import { setupWorker } from 'msw/browser';
import { postsHandlers } from './handlers/posts';
import { handlers } from './handlers';
import { boardHandlers } from './handlers/boards';
import { commentHandlers } from './handlers/comment';
import { fanfalPartHandlers } from './handlers/fanfalParticipaiton';

export const worker = setupWorker(
    ...postsHandlers,
    ...handlers,
    ...boardHandlers,
    ...commentHandlers,
    ...fanfalPartHandlers
);
