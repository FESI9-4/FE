import { logoutHandlers, signupHandlers, userHandlers } from './auths';
export const handlers = [...logoutHandlers, ...signupHandlers, ...userHandlers];
