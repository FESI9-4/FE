import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers';
import { commentHandlers } from './handlers/comment';
import { fanfalPartHandlers } from './handlers/fanfalParticipaiton';
import { imageHandlers } from './handlers/imgS3';
import { createBoardHandlers } from './handlers/createFanfal';
import { wishLikeHandlers } from './handlers/like';
import { mypageHandlers } from './handlers/mypage';
import { detailHandlers } from './handlers/detail';

export const worker = setupWorker(
    ...authHandlers,
    ...commentHandlers,
    ...fanfalPartHandlers,
    ...imageHandlers,
    ...createBoardHandlers,
    ...wishLikeHandlers,
    ...mypageHandlers,
    ...detailHandlers
);
