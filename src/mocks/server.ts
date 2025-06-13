import { setupServer } from 'msw/node';
import { detailHandlers } from './handlers/detail';

// MSW 서버를 설정합니다.
export const server = setupServer(...detailHandlers);
