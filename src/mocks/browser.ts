import { setupWorker } from 'msw/browser';
import { postsHandlers } from './handlers/posts';
import { handlers } from './handlers';

// 브라우저에서 MSW 실행
export const worker = setupWorker(...postsHandlers, ...handlers);
