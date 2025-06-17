import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { commentHandlers } from './handlers/comment';
import { fanfalPartHandlers } from './handlers/fanfalParticipaiton';
import { getBoardHandlers } from './handlers/getBoards';
import { imageHandlers } from './handlers/imgS3';
import { createBoardHandlers } from './handlers/createFanfal';

export const worker = setupWorker(
    ...handlers,
    ...commentHandlers,
    ...fanfalPartHandlers,
    ...getBoardHandlers,
    ...imageHandlers,
    ...createBoardHandlers
);
