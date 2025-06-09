import {
    loginHandlers,
    logoutHandlers,
    signupHandlers,
    userHandlers,
    refreshHandlers,
    checkUserIdHandlers,
} from './auths';

export const handlers = [
    ...loginHandlers,
    ...logoutHandlers,
    ...signupHandlers,
    ...userHandlers,
    ...refreshHandlers,
    ...checkUserIdHandlers,
];
